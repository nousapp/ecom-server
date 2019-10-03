const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorWithHttpStatus) res.status(err.status).send(err.message);
  else res.status(500).send('Server Error');
};

module.exports = errorHandler;