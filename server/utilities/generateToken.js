const jwt = require('jsonwebtoken');
require('dotenv').config();


const generateToken = (user, expiresIn = '7d') => {
  console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debugging line
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

module.exports = generateToken;
