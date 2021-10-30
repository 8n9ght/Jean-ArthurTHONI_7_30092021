const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

router.get( '/feed', auth, postCtrl.displayFeed ); /* Affichage de tout les posts */
router.post( '/create_post', auth, postCtrl.createPost ); /* Création d'un post */
router.delete( '/delete_post/:postId', auth, postCtrl.deletePost ); /* Suppression des posts */
router.post( '/feed/:id/like', auth, postCtrl.likeManagement);/* Gestion des likes */

module.exports = router;