const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');

router.get('/gpdb', adminCtrl.createDB);
router.get('/new_table_user', adminCtrl.createUserTb);
router.get('/new_table_post', adminCtrl.createPostTb);

module.exports = router;