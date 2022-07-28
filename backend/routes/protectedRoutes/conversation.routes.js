module.exports = (app, io) => {
  const conversationController =
    require('../../controllers/conversation.controller')(io);
  const router = require('express').Router();

  router.get('/', conversationController.getAll);
  router.post('/', conversationController.create);
  router.get('/:id', conversationController.getOneById);
  router.patch('/:id', conversationController.update);
  router.delete('/:id', conversationController.delete);

  /* Conversation Users */
  router.post('/:id/users', conversationController.addConversationUsers);
  router.delete('/:id/users', conversationController.removeConversationUsers);

  app.use('/conversations', router);
};
