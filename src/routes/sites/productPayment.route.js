const express = require('express');
const router = express.Router();

const productPaymentController = require('../../controllers/sites/productPayment.controller');

router.get('/:id', productPaymentController.get);

module.exports = router;