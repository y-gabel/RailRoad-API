const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  pseudo: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
