const {
  createdResponse,
  notCreatedResponse,
  successResponse,
  notFoundResponse,
  unauthorizedResponse,
} = require('../helpers/response');
const { slugify } = require('../helpers/util');
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
            order: [['createdAt', 'DESC']],
            limit: 1,
          },
          {
            model: models.User,
          },
        ],
        joinTableAttributes: [],
      })
      .then((conversations) => {
        let response = conversations.map((conversation) => {
          conversation = conversation.toJSON();
          if (!conversation.avatar) {
            conversation.avatar = 'https://via.placeholder.com/150';
          }
          return conversation;
        });
        successResponse(res, response);
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
            order: [['createdAt', 'DESC']],
            include: [
              {
                model: models.User,
              },
            ],
            limit: 20,
          },
          {
            model: models.User,
          },
        ],
      })
      .then((conversations) => {
        if (conversations.length === 0) {
          throw new Error('Conversation not found');
        }
        const response = conversations[0].toJSON();
        response.Messages = response.Messages.reverse();
        successResponse(res, response);
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
    const {
      name: conversationName,
      avatar: conversationAvatar,
      isPinned,
    } = req.body;

    models.Conversation.create({
      name: conversationName,
      slug: slugify(conversationName),
      avatar: conversationAvatar || null,
      is_pinned: isPinned || false,
    })
      .then((conversation) => {
        conversation.addUsers(user);
        conversation.setDataValue('Users', [user]);
        conversation.setDataValue('Messages', []);
        createdResponse(res, conversation);
      })
      .catch((err) => {
        notCreatedResponse(res, err);
      });
  } else {
    unauthorizedResponse(res, { message: 'Invalid token.' });
  }
};

exports.addConversationUsers = async (req, res) => {
  if (req.user) {
    /**
     * @type {import('sequelize').Model}
     */
    const user = req.user;
    const conversations = await user.getConversations({
      where: {
        id: req.params.id,
      },
      joinTableAttributes: [],
    });

    if (conversations.length === 0) {
      return notFoundResponse(res, {
        message: 'Không tìm thấy đoạn hội thoại!',
      });
    }

    const conversation = conversations[0];

    const addUser = await models.User.findOne({
      where: {
        id: req.body.userId,
      },
    });

    if (addUser) {
      await conversation.addUsers(addUser);
      conversation.setDataValue('Users', await conversation.getUsers());
      successResponse(res, conversation);
    } else {
      return notFoundResponse(res, {
        message: 'Người dùng không tồn tại',
      });
    }
  }
};

exports.removeConversationUsers = async (req, res) => {
  if (req.user) {
    /**
     * @type {import('sequelize').Model}
     */
    const user = req.user;
    const conversations = await user.getConversations({
      where: {
        id: req.params.id,
      },
      joinTableAttributes: [],
    });

    if (conversations.length === 0) {
      return notFoundResponse(res, {
        message: 'Không tìm thấy đoạn hội thoại!',
      });
    }

    const conversation = conversations[0];

    const addUser = await models.User.findOne({
      where: {
        id: req.body.userId,
      },
    });
    if (addUser) {
      await conversation.removeUsers(user);
      conversation.setDataValue('Users', await conversation.getUsers());
      return successResponse(res, conversation);
    } else {
      return notFoundResponse(res, {
        message: 'Người dùng không tồn tại',
      });
    }
  }
};
