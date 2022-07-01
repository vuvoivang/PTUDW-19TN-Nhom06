const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const authController = require('../controllers/sites/auth.controller')

router.use(authController.isLoggedIn, authController.firewallUrlHandle);

router.route('/create').get(adminController.createManager);
router.route('/view').get(adminController.viewManager);
router.route('/place').get(adminController.viewPlace);
router.route('/').get(adminController.viewManager);


module.exports = router;

