const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');

router.get('/create-manager', adminController.createAccount);
router.get('/', adminController.get);


module.exports = router;

