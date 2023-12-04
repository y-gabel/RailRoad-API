const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, pseudo, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const user = new User({ email, pseudo, role });
    await user.setPassword(password);
    await user.save();

    const token = jwt.sign({ _id: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

exports.loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    try {
      if (err || !user) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const token = jwt.sign({ _id: user._id }, 'your-secret-key', { expiresIn: '1h' });

        return res.json({ user, token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};
