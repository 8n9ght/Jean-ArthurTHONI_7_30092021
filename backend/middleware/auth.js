const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.id;
    if (req.body.userId && req.body.userId !== userId) {
      console.log('ID de l\'utilisateur invalide');
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      message: 'Requête invalide'
    });
  }
};