/**
 * Login Attempts Tracker
 * Prevents brute force attacks by tracking failed login attempts
 */

const { db } = require('../config/database');
const logger = require('../utils/logger');

// In-memory store for login attempts (for production, use Redis)
const loginAttempts = new Map();

// Configuration
const MAX_ATTEMPTS = parseInt(process.env.MAX_FAILED_LOGIN_ATTEMPTS) || 5;
const LOCKOUT_DURATION = parseInt(process.env.LOCKOUT_DURATION_MINUTES) || 15;

/**
 * Check if account is locked
 */
const isAccountLocked = (email) => {
  const attempts = loginAttempts.get(email);
  
  if (!attempts) return false;
  
  // Check if lockout period has expired
  if (attempts.lockedUntil && attempts.lockedUntil > Date.now()) {
    return true;
  }
  
  // Reset if lockout expired
  if (attempts.lockedUntil && attempts.lockedUntil <= Date.now()) {
    loginAttempts.delete(email);
    return false;
  }
  
  return false;
};

/**
 * Get remaining lockout time in minutes
 */
const getRemainingLockoutTime = (email) => {
  const attempts = loginAttempts.get(email);
  
  if (!attempts || !attempts.lockedUntil) return 0;
  
  const remaining = Math.ceil((attempts.lockedUntil - Date.now()) / 60000);
  return remaining > 0 ? remaining : 0;
};

/**
 * Record failed login attempt
 */
const recordFailedAttempt = (email) => {
  const attempts = loginAttempts.get(email) || { count: 0, firstAttempt: Date.now() };
  
  attempts.count += 1;
  attempts.lastAttempt = Date.now();
  
  // Lock account if max attempts reached
  if (attempts.count >= MAX_ATTEMPTS) {
    attempts.lockedUntil = Date.now() + (LOCKOUT_DURATION * 60 * 1000);
    logger.warn(`Account locked for ${email} after ${attempts.count} failed attempts`);
  }
  
  loginAttempts.set(email, attempts);
  
  return {
    attemptsRemaining: Math.max(0, MAX_ATTEMPTS - attempts.count),
    isLocked: attempts.count >= MAX_ATTEMPTS,
    lockedUntil: attempts.lockedUntil,
  };
};

/**
 * Reset login attempts on successful login
 */
const resetAttempts = (email) => {
  loginAttempts.delete(email);
  logger.info(`Login attempts reset for ${email}`);
};

/**
 * Middleware to check if account is locked
 */
const checkAccountLock = (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return next();
  }
  
  if (isAccountLocked(email)) {
    const remaining = getRemainingLockoutTime(email);
    return res.status(429).json({
      success: false,
      message: `Account temporarily locked due to multiple failed login attempts. Please try again in ${remaining} minutes.`,
      locked: true,
      remainingMinutes: remaining,
    });
  }
  
  next();
};

/**
 * Clean up expired entries (run periodically)
 */
const cleanupExpiredLocks = () => {
  const now = Date.now();
  for (const [email, attempts] of loginAttempts.entries()) {
    if (attempts.lockedUntil && attempts.lockedUntil <= now) {
      loginAttempts.delete(email);
    }
  }
};

// Run cleanup every 5 minutes
setInterval(cleanupExpiredLocks, 5 * 60 * 1000);

module.exports = {
  isAccountLocked,
  getRemainingLockoutTime,
  recordFailedAttempt,
  resetAttempts,
  checkAccountLock,
};
