const auth = require('./middleware/auth');

module.exports = (io) => {
  io.use(auth).on('connection', (socket) => {
    const user = socket.data.user;
    console.log('user connected', user?.firstName);
    socket.join('user ' + user.id);
    user.Conversations.forEach((conversation) => {
      socket.join(conversation.slug);
      console.log(user.firstName + ' joined ' + conversation.slug);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected', socket.data?.user?.firstName);
    });

    require('./messageHandle')(io, socket);
  });
};
