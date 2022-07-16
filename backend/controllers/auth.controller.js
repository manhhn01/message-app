const bcrypt = require('bcrypt');
const {
  notFoundResponse,
  unauthorizedResponse,
  successResponse,
  notCreatedResponse,
  createdResponse,
  serverErrorResponse,
} = require('../helpers/response');
const jwt = require('jsonwebtoken');
const models = require('../models');

exports.login = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        email: req.body.email.trim().toLowerCase(),
      },
      attributes: {
        include: ['password'],
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

        const { password, ...userData } = user.toJSON();
        successResponse(res, {
          token,
          user: userData,
          expiresIn: 3600,
        });
      } else {
        unauthorizedResponse(res, { message: 'Mật khẩu không đúng!' });
      }
    } else {
      notFoundResponse(res, { message: 'Người dùng không tồn tại.' });
    }
  } catch (err) {
    serverErrorResponse(res, err);
  }
};

exports.register = (req, res) => {
  const {
    firstName: first_name,
    lastName: last_name,
    email,
    password,
  } = req.body;

  models.User.create({
    first_name,
    last_name,
    email,
    password: bcrypt.hashSync(password, 10),
  })
    .then((user) => {
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

      createdResponse(res, {
        token,
        user,
        expiresIn: 3600,
      });
    })
    .catch((err) => notCreatedResponse(res, err));
};
