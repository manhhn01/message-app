const jwt = require('jsonwebtoken');
const models = require('../../models');
const lt = require('long-timeout');

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

      socket.data.user = user;

      const expiredIn = (decoded.exp - Date.now() / 1000) * 1000;
      const timeout = lt.setTimeout(() => {
        socket.disconnect();
      }, expiredIn);

      socket.on('disconnect', () => {
        lt.clearTimeout(timeout);
      });

      next();
    });
  } else next(new Error('Authentication error'));
};
