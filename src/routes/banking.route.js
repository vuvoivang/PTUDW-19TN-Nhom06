const express = require('express');
const router = express.Router();

const bankingController = require('../controllers/banking.controller');


router.post('/v1/account-payment', bankingController.createAccountPayment);
router.post('/v1/deposit', bankingController.deposit);


module.exports = router;

