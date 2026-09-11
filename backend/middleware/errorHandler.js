const notFound = (req, res, next) => {
  res.status(404).json({ success: false, error: `Not Found - ${req.originalUrl}` });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  }
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Email already exists. Use a unique email.';
  }
  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Invalid employee ID format';
  }

  res.status(statusCode).json({ success: false, error: message });
};

module.exports = { notFound, errorHandler };
