const express = require('express');
const router = express.Router();
const firebase = require('../../config/firebase');

const packageController = require('../../controllers/sites/package.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.get('/:id', authMiddleware.checkLoggedIn, packageController.get);
router.get('/payment/:id', authMiddleware.checkLoggedIn, authMiddleware.mustLoggedIn, packageController.getPayment);
router.post('/', firebase.upload.single('image'), packageController.create);

module.exports = router;
