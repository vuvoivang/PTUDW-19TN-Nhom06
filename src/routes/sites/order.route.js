const express = require('express');
const router = express.Router();

const orderController = require('../../controllers/sites/order.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

// router.get('/:id', orderController.get);
router.post('/', authMiddleware.checkLoggedIn, authMiddleware.mustLoggedIn, orderController.create);
// router.delete('/:id', orderController.delete);
// router.put('/:id',  orderController.update);

module.exports = router;
