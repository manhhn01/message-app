module.exports = (app) => {
  const userController = require('../../controllers/user.controller');
  const router = require('express').Router();

  router.get('/', userController.getAll);
  router.post('/', userController.create);

  app.use('/users', router);
};
