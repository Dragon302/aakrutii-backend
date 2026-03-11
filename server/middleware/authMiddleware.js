const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Guard 1: Must be logged in
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Guard 2: Must be an ADMIN
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // You are admin, proceed to make changes!
  } else {
    res.status(401).json({ message: 'Access Denied: Admins Only' });
  }
};

module.exports = { protect, admin };