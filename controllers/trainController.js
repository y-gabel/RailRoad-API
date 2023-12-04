const Train = require('../models/train');

exports.getAllTrains = async (req, res) => {
  try {
    const { sortBy, sortOrder, limit } = req.query;

    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    const trains = await Train.find().sort(sortOptions).limit(parseInt(limit) || 10);

    res.status(200).json(trains);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

exports.createTrain = async (req, res) => {
  try {
    const { name, departureStation, arrivalStation, departureTime } = req.body;

    const train = new Train({ name, departureStation, arrivalStation, departureTime });
    await train.save();

    res.status(201).json(train);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

exports.getTrain = async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);

    if (!train) {
      return res.status(404).json({ message: 'Train non trouvé' });
    }

    res.status(200).json(train);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

exports.updateTrain = async (req, res) => {
  try {
    const updatedTrain = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedTrain) {
      return res.status(404).json({ message: 'Train non trouvé' });
    }

    res.status(200).json(updatedTrain);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

exports.deleteTrain = async (req, res) => {
  try {
    await Train.findByIdAndDelete(req.params.id);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};
