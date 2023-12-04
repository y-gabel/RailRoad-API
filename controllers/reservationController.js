const Reservation = require('../models/reservation');
const Train = require('../models/train');

exports.createReservation = async (req, res) => {
  try {
    const { userId, trainId, seatNumber } = req.body;

    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({ message: 'Train non trouvé' });
    }

    const reservation = new Reservation({ userId, trainId, seatNumber });
    await reservation.save();

    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

exports.validateReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    // Ajoutez ici votre logique de validation de réservation

    res.status(200).json({ message: 'Réservation validée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};
