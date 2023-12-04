const Station = require('../models/station');

exports.getAllStations = async (req, res) => {
  try {
    const { sortBy } = req.query;

    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = 1;
    }

    const stations = await Station.find().sort(sortOptions);

    res.status(200).json(stations);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

exports.createStation = async (req, res) => {
  try {
    const { name, openingTime, closingTime, image } = req.body;

    const station = new Station({ name, openingTime, closingTime, image });
    await station.save();

    res.status(201).json(station);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

exports.getStation = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({ message: 'Gare non trouvée' });
    }

    res.status(200).json(station);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

exports.updateStation = async (req, res) => {
  try {
    const updatedStation = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedStation) {
      return res.status(404).json({ message: 'Gare non trouvée' });
    }

    res.status(200).json(updatedStation);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

exports.deleteStation = async (req, res) => {
  try {
    await Station.findByIdAndDelete(req.params.id);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};
