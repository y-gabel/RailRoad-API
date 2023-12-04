const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

// Créer une nouvelle réservation
router.post('/', authMiddleware, reservationController.createReservation);

// Valider une réservation
router.post('/:reservationId/validate', authMiddleware, reservationController.validateReservation);

module.exports = router;
