const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès non autorisé pour les administrateurs uniquement' });
    }
  
    next();
  };
  
  module.exports = adminMiddleware;
  