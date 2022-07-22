module.exports = (app) => {
  const userController = require('../../controllers/user.controller');
  const router = require('express').Router();

  router.get('/search', userController.searchUsers);
  
  app.use('/users', router);
  app.get('/user', userController.getUser);
};
