const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  openingTime: { type: String, required: true },
  closingTime: { type: String, required: true },
  image: { type: Buffer },
});

module.exports = mongoose.model('Station', stationSchema);
