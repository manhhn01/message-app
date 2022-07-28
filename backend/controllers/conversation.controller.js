const {
  createdResponse,
  notCreatedResponse,
  successResponse,
  notFoundResponse,
  unauthorizedResponse,
  forbiddenResponse,
} = require('../helpers/response');
const { slugify } = require('../helpers/util');
const models = require('../models');

module.exports = (io) => {
  return {
    getAll: (req, res) => {
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
                include: [{ model: models.User }],
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
    },

    getOneById: (req, res) => {
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
                // limit: 20,
              },
              {
                model: models.User,
              },
              {
                model: models.User,
                as: 'Creator',
              },
            ],
          })
          .then((conversations) => {
            if (conversations.length === 0) {
              throw new Error('Conversation not found');
            }
            const conversation = conversations[0];
            conversation.setDataValue(
              'Messages',
              conversation.Messages.reverse()
            );
            successResponse(res, conversation);
          })
          .catch((err) => {
            notFoundResponse(res, err);
          });
      } else {
        unauthorizedResponse(res, { message: 'Invalid token.' });
      }
    },

    create: (req, res) => {
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
          slug: slugify(conversationName) + '-' + Date.now(),
          avatar: conversationAvatar || null,
          isPinned: isPinned || false,
          creatorId: user.id,
        })
          .then((conversation) => {
            conversation.addUsers(user);
            conversation.setDataValue('Users', [user]);
            conversation.setDataValue('Creator', user);
            conversation.setDataValue('Messages', []);
            io.in('user ' + user.id)
              .fetchSockets()
              .then((sockets) =>
                sockets.forEach((socket) => {
                  socket.join(conversation.slug);
                  console.log(user.firstName + ' joined ' + conversation.slug);
                })
              );
            return createdResponse(res, conversation);
          })
          .catch((err) => {
            return notCreatedResponse(res, { message: err });
          });
      } else {
        unauthorizedResponse(res, { message: 'Invalid token.' });
      }
    },

    update: async (req, res) => {
      if (req.user) {
        /**
         * @type {import('sequelize').Model}
         */
        const user = req.user;
        const { name, avatar, isPinned } = req.body;
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

        await conversation.update({
          name: name || conversation.name,
          slug: name ? slugify(name) + '-' + Date.now() : conversation.slug,
          avatar: avatar || conversation.avatar,
          isPinned: isPinned || conversation.isPinned,
        });

        return successResponse(res, conversation);
      } else return unauthorizedResponse(res);
    },

    delete: async (req, res) => {
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
        await conversation.destroy();
        return successResponse(res, {
          message: 'Xóa thành công',
        });
      }
    },

    addConversationUsers: async (req, res) => {
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
          (await io.in('user ' + addUser.id).fetchSockets()).forEach(
            (socket) => {
              console.log(
                user.firstName + ' join conversation ' + conversation.name
              );
              socket.join(conversation.slug);
              socket.emit('join');
            }
          );

          return successResponse(res, conversation);
        } else {
          return notFoundResponse(res, {
            message: 'Người dùng không tồn tại',
          });
        }
      }
    },

    removeConversationUsers: async (req, res) => {
      console.log(req.body);
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

        if (
          req.user.id !== conversation.creatorId &&
          !req.user.id === req.body.userId
        ) {
          return forbiddenResponse(res, {
            message: 'Bạn không có quyền xóa người dùng',
          });
        }

        const removeUser = await models.User.findOne({
          where: {
            id: req.body.userId,
          },
        });
        if (removeUser) {
          await conversation.removeUsers(removeUser);
          conversation.setDataValue('Users', await conversation.getUsers());
          return successResponse(res, conversation);
        } else {
          return notFoundResponse(res, {
            message: 'Người dùng không tồn tại',
          });
        }
      }
    },
  };
};
