const { validationResult } = require('express-validator');

// Validate request
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value,
      })),
    });
  }
  
  next();
};

// Audit log middleware
const auditLog = (action_type) => {
  return async (req, res, next) => {
    const { db } = require('../config/database');
    
    // Store original json function
    const originalJson = res.json;
    
    // Override json function to log after response
    res.json = async function(data) {
      try {
        // Only log successful operations
        if (data.success !== false) {
          await db('dga_audit_trail').insert({
            user_id: req.user?.id,
            action_type: action_type,
            table_name: req.baseUrl.split('/').pop(),
            record_id: data.data?.id || req.params.id,
            old_values: req.body._old ? JSON.stringify(req.body._old) : null,
            new_values: JSON.stringify(req.body),
            ip_address: req.ip,
            user_agent: req.headers['user-agent'],
          });
        }
      } catch (error) {
        console.error('Audit log error:', error.message);
      }
      
      // Call original json function
      return originalJson.call(this, data);
    };
    
    next();
  };
};

module.exports = {
  validate,
  auditLog,
};
