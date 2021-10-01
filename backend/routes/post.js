const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

router.get( '/', auth, ); /* Affichage de tout les posts */
router.get( '/:id', auth, ); /* Affichage d'un post */
router.post( '/', auth, multer, ); /* Création d'un post */
router.put( '/:id', auth, multer, ); /* Modification d'un post */
router.delete( '/:id', auth, ); /* Suppression d'un post */
/* router.get('/sauces', saucesCtrl.getAllSauces); */

module.exports = router;