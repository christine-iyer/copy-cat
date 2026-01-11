const jwt = require('jsonwebtoken');
const User = require('../models/User');
const extractToken = require('../utilities/extractToken');
const RevokedToken = require('../models/RevokedToken');
// Ensure token is valid
const protect = async (req, res, next) => {
  const token = extractToken(req);
  req.token = token; // Attach to req for logout controller
  console.log('Extracted Token:', req.token);

  // Check if token is revoked
  const isRevoked = await RevokedToken.findOne({ token });
  if (isRevoked) {
    return res.status(401).json({ message: 'Token has been revoked.' });
  }

  try {
    // Locate user with id stored in token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Role-base restriction
const restricTo = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: 'You do not have permission to perform this action' });
    }
    next();
  };
};

module.exports = {
  protect,
  restricTo,
};
