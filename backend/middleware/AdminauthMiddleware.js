const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Protect routes for admins
const protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if the user is an admin
      if (!decoded.isAdmin) {
        return res.status(403).json({ message: 'Access denied, not an admin' });
      }

      // Attach admin info to the request object
      req.admin = await Admin.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protectAdmin };
