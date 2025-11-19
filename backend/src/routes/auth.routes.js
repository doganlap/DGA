const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body } = require('express-validator');
const { db } = require('../config/database');
const { authenticate, generateToken } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { checkAccountLock, recordFailedAttempt, resetAttempts } = require('../middleware/loginAttempts');
const logger = require('../utils/logger');

// @route   POST /api/auth/login
// @desc    Login user and get token
// @access  Public
router.post('/login', 
  checkAccountLock, // Check if account is locked before processing
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    validate,
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await db('users')
        .where({ email })
        .first();

      if (!user) {
        // Record failed attempt (user not found)
        const attemptInfo = recordFailedAttempt(email);
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
          attemptsRemaining: attemptInfo.attemptsRemaining,
        });
      }

      // Check if user is active
      if (!user.is_active) {
        return res.status(403).json({
          success: false,
          message: 'Account is inactive. Please contact administrator.',
        });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        // Record failed attempt (wrong password)
        const attemptInfo = recordFailedAttempt(email);
        logger.warn(`Failed login attempt for ${email}. Attempts remaining: ${attemptInfo.attemptsRemaining}`);
        
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
          attemptsRemaining: attemptInfo.attemptsRemaining,
        });
      }
      
      // Reset login attempts on successful login
      resetAttempts(email);

      // Update last login
      await db('users')
        .where({ user_id: user.user_id })
        .update({ last_login: new Date() });

      // Generate token
      const token = generateToken(user);

      // Get user entity info if applicable
      let entityInfo = null;
      if (user.entity_id) {
        entityInfo = await db('dga_entities')
          .where({ entity_id: user.entity_id })
          .select('entity_id', 'entity_code', 'entity_name_en', 'region')
          .first();
      }

      logger.info(`User logged in: ${user.email} (${user.role})`);

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          user_id: user.user_id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
          region: user.region,
          entity: entityInfo,
        },
      });
    } catch (error) {
      logger.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Login failed',
        error: error.message,
      });
    }
  }
);

// @route   POST /api/auth/register
// @desc    Register new user (Admin only in production)
// @access  Public (should be protected in production)
router.post('/register',
  [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('full_name').notEmpty().withMessage('Full name is required'),
    body('role').notEmpty().withMessage('Role is required'),
    validate,
  ],
  async (req, res) => {
    try {
      const { username, email, password, full_name, role, region, entity_id } = req.body;

      // Check if user already exists
      const existingUser = await db('users')
        .where({ email })
        .orWhere({ username })
        .first();

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email or username already exists',
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      // Create user
      const [newUser] = await db('users')
        .insert({
          username,
          email,
          password_hash,
          full_name,
          role,
          region,
          entity_id,
          is_active: true,
        })
        .returning('*');

      logger.info(`New user registered: ${email} (${role})`);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            full_name: newUser.full_name,
            role: newUser.role,
          },
        },
      });
    } catch (error) {
      logger.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Registration failed',
        error: error.message,
      });
    }
  }
);

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await db('users')
      .where({ user_id: req.user.user_id })
      .first();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Get entity info if applicable
    let entityInfo = null;
    if (user.entity_id) {
      entityInfo = await db('dga_entities')
        .where({ entity_id: user.entity_id })
        .select('entity_id', 'entity_code', 'entity_name_en', 'region')
        .first();
    }

    res.json({
      success: true,
      message: 'User profile retrieved',
      user: {
        user_id: user.user_id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        region: user.region,
        phone: user.phone,
        entity: entityInfo,
      },
    });
  } catch (error) {
    logger.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile',
      error: error.message,
    });
  }
});

module.exports = router;
