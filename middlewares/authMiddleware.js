const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ message: 'Authentification requise' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }

    req.user = { _id: decoded._id, role: decoded.role };
    next();
  });
};

module.exports = authMiddleware;
