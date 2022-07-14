const bcrypt = require('bcrypt');
const {
  notFoundResponse,
  unauthorizedResponse,
  successResponse,
  notCreatedResponse,
  createdResponse,
} = require('../helpers/response');
const jwt = require('jsonwebtoken');
const models = require('../models');

exports.login = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        email: req.body.email.toLowerCase(),
      },
    });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          'very_secret',
          {
            expiresIn: 3600,
          }
        );
        successResponse(res, {
          token,
          expiresIn: 3600,
        });
      } else {
        unauthorizedResponse(res, { message: 'Mật khẩu không đúng!' });
      }
    } else {
      notFoundResponse(res, { message: 'Người dùng không tồn tại.' });
    }
  } catch (err) {
    notFoundResponse(res, err);
  }
};

exports.register = (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  models.User.create({
    first_name,
    last_name,
    email,
    password: bcrypt.hashSync(password, 10),
  })
    .then((user) => createdResponse(res, user))
    .catch((err) => notCreatedResponse(res, err));
};
