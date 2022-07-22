const jwt = require('jsonwebtoken');
const models = require('../../models');

module.exports = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) {
    jwt.verify(token, 'very_secret', async (err, decoded) => {
      if (err) {
        console.log(err.message);
        return;
      }

      const user = await models.User.findOne({
        where: {
          id: decoded.id,
        },
        include: {
          model: models.Conversation,
        },
      });
      user.Conversations.forEach((conversation) => {
        socket.join(conversation.slug);
        console.log(user.firstName + ' joined ' + conversation.slug);
      });

      socket.data.user = user;

      next();
    });
  } else next(new Error('Authentication error'));
};
