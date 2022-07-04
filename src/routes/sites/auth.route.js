const express = require('express');
const controller = require('./../../controllers/sites/auth.controller');
const router = express.Router();

router.route('/signup').post(controller.signup);
router.route('/signout').post(controller.signOut);
router.route('/signin').post(controller.signIn);
router.route('/firebase').post(controller.firebaseHandle);
router.route('/authorize').post(controller.authorizeAccount);

module.exports = router;
