const { serverErrorResponse } = require('../helpers/response');

module.exports = (err, req, res, next) => {
  if (err) return serverErrorResponse(res, err);
  next();
};
