const express = require('express');
module.exports = (app) => {
  const userController = require('../../controllers/user.controller');
  const usersRouter = express.Router();
  const userRouter = express.Router();

  userRouter.get('/', userController.getUser);
  userRouter.patch('/', userController.updateUser);

  usersRouter.get('/search', userController.searchUsers);

  app.use('/users', usersRouter);
  app.use('/user', userRouter);
};
