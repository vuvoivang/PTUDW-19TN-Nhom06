const express = require('express');
const router = express.Router();
const firebase = require('../../config/firebase');

const packageController = require('../../controllers/sites/package.controller');

router.get('/:id', packageController.get);
router.get('/payment/:id', packageController.getPayment);
router.post('/', firebase.upload.single('image'), packageController.create);

module.exports = router;
