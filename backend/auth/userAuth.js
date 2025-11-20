// auth/userAuth.js
import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  jwt.verify(token, 'bookStore123', (err, decoded) => {
    if (err) {
      //console.error('JWT verify error:', err.message);
      return res
        .status(403)
        .json({ message: 'Token expired or invalid. Please sign in again.' });
    }

    // decoded should contain at least: { id: '...', ... }
    req.user = decoded;
    req.userId = decoded.id; // use this in routes

    next();
  });
};

export default authenticateToken;
