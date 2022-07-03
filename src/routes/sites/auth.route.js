const express = require('express');
const controller = require('./../../controllers/sites/auth.controller');
const router = express.Router();

router.route('/signup').post(controller.signup);
router.route('/signup/firebase').post(controller.firebaseSignupHandle);
router.route('/signout').post(controller.signOut);
router.route('/signin').post(controller.signIn);
router.route('/signin/firebase').post(controller.firebaseSigninHandle);
router.route('/authorize').post(controller.authorizeAccount);

module.exports = router;
