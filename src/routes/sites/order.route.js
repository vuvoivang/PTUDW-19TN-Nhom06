const express = require('express');
const router = express.Router();

const orderController = require('../../controllers/sites/order.controller');

// router.get('/:id', orderController.get);
router.post('/', orderController.create);
// router.delete('/:id', orderController.delete);
// router.put('/:id',  orderController.update);

module.exports = router;
