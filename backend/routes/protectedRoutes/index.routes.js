const auth = require('../../middleware/auth');

module.exports = (app, io) => {
  const router = require('express').Router();

  router.use(auth);

  require('./user.routes')(router, io);
  require('./conversation.routes')(router, io);
  require('./imageUpload.routes')(router, io);

  app.use('/', router);
};
