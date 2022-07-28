const path = require('path');

module.exports = (app, io) => {
  app.use(
    '/images',
    require('express').static(path.join(__dirname, '../public/images'))
  );
  require('./auth.routes')(app, io);
  require('./protectedRoutes/index.routes')(app, io);
};
