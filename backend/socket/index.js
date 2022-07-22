const auth = require('./middleware/auth');

module.exports = (io) => {
  io.use(auth).on('connection', (socket) => {
    console.log('user connected', socket.data?.user?.firstName);
    socket.on('disconnect', () => {
      console.log('user disconnected', socket.data?.user?.firstName);
    });

    require('./messageHandle')(io, socket);
  });
};
