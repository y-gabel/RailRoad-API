const sharp = require('sharp');

const resizeImageMiddleware = (req, res, next) => {
  if (req.file) {
    sharp(req.file.buffer)
      .resize(200, 200)
      .toBuffer()
      .then((buffer) => {
        req.file.buffer = buffer;
        next();
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Erreur serveur lors du redimensionnement de l\'image');
      });
  } else {
    next();
  }
};

module.exports = resizeImageMiddleware;
