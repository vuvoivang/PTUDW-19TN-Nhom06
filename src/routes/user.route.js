const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authController = require('../controllers/sites/auth.controller')

router.use(authController.isLoggedIn, authController.firewallUrlHandle);

router.get('/account', userController.getAccountInfo);
router.get('/managementHistory', userController.getManagementHistory);
router.get('/paymentHistory/order/:orderId', userController.getOrderOfPaymentHistory);
router.get('/paymentHistory', userController.getPaymentHistory);
router.get('/accountPayment', userController.getAccountPayment);
router.post('/change-password', userController.changePassword);

router.get('/', userController.getAccountPayment);

module.exports = router;