const {
  unauthorizedResponse,
  successResponse,
} = require('../helpers/response');
const models = require('../models');
const Op = require('sequelize').Op;

exports.getUser = (req, res) => {
  if (req.user) {
    return res.send(req.user);
  }

  return unauthorizedResponse(res);
};

exports.searchUsers = (req, res) => {
  console.log(req.query);
  models.User.findAll({
    where: {
      [Op.or]: {
        firstName: {
          [Op.like]: `%${req.query.name}%`,
        },
        lastName: {
          [Op.like]: `%${req.query.name}%`,
        },
        email: {
          [Op.like]: `%${req.query.name}%`,
        },
      },
    },
  }).then((users) => {
    return successResponse(res, users);
  });
};
