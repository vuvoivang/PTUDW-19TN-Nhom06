const express = require('express');
const router = express.Router();

const managerController = require('../controllers/manager.controller');

router.get('/', managerController.get);

module.exports = router;
