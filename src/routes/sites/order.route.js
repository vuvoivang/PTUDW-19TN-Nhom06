const express = require('express');
const router = express.Router();

const orderController = require('../../controllers/sites/order.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.get('/statistics-product', orderController.statisticProductByMonth);
router.get('/statistics-package', orderController.statisticPackageByMonth);
router.post('/', authMiddleware.checkLoggedIn, authMiddleware.mustLoggedIn, orderController.create);

module.exports = router;
