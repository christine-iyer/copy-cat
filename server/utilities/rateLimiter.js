const rateLimit = require('express-rate-limit');

const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many login attempts. Please try again later.',
});

const globalRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // Increased limit for testing
  message: 'Too many requests from this IP. Try again later.',
});

module.exports = {
  loginRateLimiter,
  globalRateLimiter,
};
