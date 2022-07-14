const {
  createdResponse,
  notCreatedResponse,
  successResponse,
  notFoundResponse,
  unauthorizedResponse,
} = require('../helpers/response');
const models = require('../models');

exports.getAll = (req, res) => {
  if (req.user) {
    /**
     * @type {import('sequelize').Model}
     */
    const user = req.user;
    user
      .getConversations({
        include: [
          {
            model: models.Message,
            order: [['created_at', 'DESC']],
            limit: 1,
          },
        ],
      })
      .then((conversations) => {
        successResponse(res, conversations);
      })
      .catch((err) => {
        notFoundResponse(res, err);
      });
  } else {
    unauthorizedResponse(res, { message: 'Invalid token.' });
  }
};

exports.getOneById = (req, res) => {
  if (req.user) {
    /**
     * @type {import('sequelize').Model}
     */
    const user = req.user;
    user
      .getConversations({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: models.Message,
            order: [['created_at', 'DESC']],
          },
        ],
      })
      .then((conversation) => {
        successResponse(res, conversation);
      })
      .catch((err) => {
        notFoundResponse(res, err);
      });
  } else {
    unauthorizedResponse(res, { message: 'Invalid token.' });
  }
};

exports.create = (req, res) => {
  if (req.user) {
    /**
     * @type {import('sequelize').Model}
     */
    const user = req.user;

    models.Conversation.create({
      name: req.body.name,
    })
      .then((conversation) => {
        conversation.addUser(user);
        createdResponse(res, conversation);
      })
      .catch((err) => {
        notCreatedResponse(res, err);
      });
  } else {
    unauthorizedResponse(res, { message: 'Invalid token.' });
  }
};
