const { unauthorizedResponse } = require('../helpers/response');
const jwt = require('jsonwebtoken');
const models = require('../models');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token)
    return unauthorizedResponse(res, { message: 'No token provided.' });

  jwt.verify(token, 'very_secret', (err, decoded) => {
    if (err) {
      console.log(err.message);
      return unauthorizedResponse(res, err);
    }

    models.User.findByPk(decoded.id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        unauthorizedResponse(res, err);
        throw err;
      });
  });
};
