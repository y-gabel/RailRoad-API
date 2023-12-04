const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Créer un nouvel utilisateur
router.post(
  '/register',
  validationMiddleware, // Middleware de validation
  userController.createUser
);

// Connexion utilisateur
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  userController.loginUser
);

// Obtenir les informations d'un utilisateur
router.get('/:id', authMiddleware, userController.getUser);

// Mettre à jour les informations d'un utilisateur
router.put('/:id', authMiddleware, userController.updateUser);

// Supprimer un utilisateur (accessible uniquement par l'administrateur)
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;
