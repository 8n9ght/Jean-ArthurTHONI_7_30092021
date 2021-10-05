const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

router.get( '/feed', postCtrl.displayFeed ); /* Affichage de tout les posts */
router.post( '/create_post', postCtrl.createPost ); /* Création d'un post */
router.delete( '/delete_post/:postId', postCtrl.deletePost ); /* Suppression des posts */

module.exports = router;