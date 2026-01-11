const extractToken = (req) => {
  console.log('Headers received:', req.headers);
  const authHeader = req.headers.authorization;
  console.log('Auth header:', authHeader);
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    console.log('Token extracted:', token);
    return token;
  }
  console.log('No valid token found');
  return null;
};

module.exports = extractToken;