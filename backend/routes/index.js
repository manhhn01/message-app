module.exports = (app) => {
  require('./auth.routes')(app);
  require('./protectedRoutes/index.routes')(app);
};
