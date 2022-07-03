const express = require('express');
const router = express.Router();

const bankingController = require('../controllers/banking.controller');


router.post('/v1/account-payment', bankingController.createAccountPayment);
router.post('/v1/exchange', bankingController.exchange);
router.post('/v1/update-minimum-transfer', bankingController.updateMinimumTransfer);

module.exports = router;

