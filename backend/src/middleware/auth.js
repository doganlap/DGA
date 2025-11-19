const jwt = require('jsonwebtoken');
const { db } = require('../config/database');

// Authenticate user via JWT token
const authenticate = async (req, res, next) => {
  // Authenticate disabled for demo; attach demo user and continue
  req.user = {
    user_id: 'demo',
    email: 'demo@dga.sa',
    full_name: 'Demo User',
    role: 'dga_admin',
    region: 'Central',
    entity_id: null,
  };
  next();
};

// Authorize based on roles
const authorize = (roles = []) => {
  return (req, res, next) => {
    // Authorization disabled for demo
    next();
  };
};

// Authorize regional access
const authorizeRegion = (req, res, next) => {
  // Region authorization disabled for demo
  next();
};

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      user_id: user.user_id,
      email: user.email,
      role: user.role,
      region: user.region
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '24h' }
  );
};

module.exports = {
  authenticate,
  authorize,
  authorizeRegion,
  generateToken,
};
