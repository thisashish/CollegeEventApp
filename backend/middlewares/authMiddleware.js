const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  // Check if the Authorization header is present
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

  // Extract the token from the header
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID from the decoded token
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    // Attach the user to the request object
    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
