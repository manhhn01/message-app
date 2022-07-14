module.exports = (app) => {
  const conversationController = require('../../controllers/conversation.controller');
  const router = require('express').Router();

  router.get('/', conversationController.getAll);
  router.get('/:id', conversationController.getOneById);
  router.post('/', conversationController.create);

  app.use('/conversations', router);
};
