const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post( '/signup', userCtrl.signup);
/* router.post( '/login', userCtrl. ); */
/* router.get('/:id', userCtrl.showProfil); */
/* router.put('/profile_update/:id', userCtrl.updateProfil);
router.delete('/profile_delete/:id', userCtrl.deleteProfil); */

module.exports = router;