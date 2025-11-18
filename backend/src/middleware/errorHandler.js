const logger = require('../utils/logger');

// Global error handler
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    user: req.user?.id,
  });

  // Default error
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Duplicate key error (PostgreSQL)
  if (err.code === '23505') {
    statusCode = 400;
    message = 'Duplicate entry. Record already exists.';
  }

  // Foreign key constraint error
  if (err.code === '23503') {
    statusCode = 400;
    message = 'Invalid reference. Related record not found.';
  }

  // Not null violation
  if (err.code === '23502') {
    statusCode = 400;
    message = 'Missing required field.';
  }

  // Validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      error: err 
    }),
  });
};

// 404 Not Found handler
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
