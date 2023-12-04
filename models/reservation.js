const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
  seatNumber: { type: String, required: true },
  isValidated: { type: Boolean, default: false },
});

module.exports = mongoose.model('Reservation', reservationSchema);
