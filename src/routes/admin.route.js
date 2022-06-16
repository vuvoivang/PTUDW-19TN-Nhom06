const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const authController = require('../controllers/sites/auth.controller')

router.use(authController.isLoggedIn, authController.firewallUrlHandle);

router.get('/create', adminController.createmanager);
router.get('/manager', adminController.viewManager);
router.get('/place', adminController.viewPlace);
router.get('/', adminController.viewManager);


module.exports = router;

