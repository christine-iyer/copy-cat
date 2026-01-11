const express = require('express');
const router = express.Router();

const { register, login, logout } = require('../controllers/authController');
const { loginRateLimiter } = require('../utilities/rateLimiter');
const { protect } = require('../middlewares/authMiddleware');
const extractToken = require('../utilities/extractToken');

// Debug middleware
const debugMiddleware = (req, res, next) => {
  console.log('Route hit:', req.method, req.path);
  next();
};

router.post('/register', register);
router.post('/login', loginRateLimiter, login);
router.post('/logout', debugMiddleware, extractToken, (req, res, next) => {
  console.log('After extractToken middleware');
  next();
}, logout);

module.exports = router;
