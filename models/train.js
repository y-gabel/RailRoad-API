const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  departureStation: { type: String, required: true },
  arrivalStation: { type: String, required: true },
  departureTime: { type: Date, required: true },
});

module.exports = mongoose.model('Train', trainSchema);
