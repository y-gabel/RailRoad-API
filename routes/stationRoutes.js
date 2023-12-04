const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const resizeImageMiddleware = require('../middlewares/resizeImageMiddleware');

// Obtenir la liste de toutes les gares
router.get('/', stationController.getAllStations);

// Créer une nouvelle gare (accessible uniquement par l'administrateur)
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  resizeImageMiddleware, // Middleware pour redimensionner l'image
  stationController.createStation
);

// Obtenir les informations d'une gare
router.get('/:id', stationController.getStation);

// Mettre à jour les informations d'une gare (accessible uniquement par l'administrateur)
router.put('/:id', authMiddleware, adminMiddleware, stationController.updateStation);

// Supprimer une gare (accessible uniquement par l'administrateur)
router.delete('/:id', authMiddleware, adminMiddleware, stationController.deleteStation);

module.exports = router;
