const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.post('/order', userController.order);

module.exports = router;