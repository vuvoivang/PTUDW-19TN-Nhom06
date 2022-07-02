const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authController = require('../controllers/sites/auth.controller')

router.use(authController.isLoggedIn, authController.firewallUrlHandle);

router.get('/:userId/account', userController.getAccountInfo);
router.get('/:userId/managementHistory', userController.getManagementHistory);
router.get('/:userId/paymentHistory', userController.getPaymentHistory);
router.get('/:userId/accountPayment', userController.getAccountPayment);

module.exports = router;