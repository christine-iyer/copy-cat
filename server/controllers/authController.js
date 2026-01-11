const bcrypt = require('bcryptjs');
const User = require('../models/User');
const RevokedToken = require('../models/RevokedToken');
const generateToken = require('../utilities/generateToken');
const jwt = require('jsonwebtoken');

// User creates new account
const register = async (req, res) => {
  try {
    const { username, name, email, password, role, phone, location } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser)
      return res.status(400).json({ message: 'Email or username already in use' });

    // Add user to database
    const user = await User.create({
      username,
      name,
      email,
      password,
      role,
      phone,
      location,
    });

    const token = generateToken(user._id); // Generate JWT Token
    res.status(201).json({ user: { id: user._id, username, name, email, role }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: 'Invalid email or password' });

  const token = generateToken(user._id); // Generate JWT Token
  res.status(200).json({
    user: { id: user._id, name: user.name, email, role: user.role },
    token,
  });
};

// ... existing code ...
const logout = async (req, res) => {
  console.log('Logout request received');
  const token = req.token;
  console.log('Token from request:', token);

  try {
    console.log('Decoding token...');
    const decoded = jwt.decode(token);
    console.log('Decoded token:', decoded);
    const expiration = new Date(decoded.exp * 1000); // exp is in seconds
    console.log('Token expiration:', expiration);

    console.log('Creating revoked token entry...');
    await RevokedToken.create({ token, expiresAt: expiration });
    console.log('Revoked token entry created');

    res.status(200).json({ message: 'Successfully logged out.' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Server error during logout.' });
  }
};
// ... existing code ...
module.exports = {
  register,
  login,
  logout,
};