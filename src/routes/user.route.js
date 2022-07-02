const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/:userId/account', userController.getAccountInfo);
router.get('/:userId/managementHistory', userController.getManagementHistory);
router.get('/:userId/paymentHistory/order/:orderId', userController.getOrderOfPaymentHistory);
router.get('/:userId/paymentHistory', userController.getPaymentHistory);
router.get('/:userId/accountPayment', userController.getAccountPayment);

module.exports = router;