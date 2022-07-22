const auth = require('../../middleware/auth');

module.exports = (app) => {
  const router = require('express').Router();

  router.use(auth);

  require('./user.routes')(router);
  require('./conversation.routes')(router);

  app.use('/', router);
};
