const {
  unauthorizedResponse,
  successResponse,
  serverErrorResponse,
} = require('../helpers/response');
const models = require('../models');
const Op = require('sequelize').Op;

exports.getUser = (req, res) => {
  if (req.user) {
    return successResponse(res, req.user);
  }

  return unauthorizedResponse(res);
};

exports.searchUsers = (req, res) => {
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

exports.updateUser = (req, res) => {
  if (req.user) {
    /** @type {import('sequelize').Model} */
    const user = req.user;
    const { firstName, lastName, avatar } = req.body;
    user
      .update({
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        avatar: avatar || user.avatar,
      })
      .then((updatedUser) => {
        return successResponse(res, updatedUser);
      })
      .catch((err) => {
        return serverErrorResponse(res, err);
      });
  }
};
