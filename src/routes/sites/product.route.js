const express = require('express');
const router = express.Router();
const firebase = require('../../config/firebase');

const productController = require('../../controllers/sites/product.controller');

router.get('/:id', productController.get);
router.post('/', firebase.upload.array('images', 5), productController.create);
router.delete('/:id', productController.delete);
router.put('/:id', firebase.upload.array('images', 5), productController.update);

module.exports = router;
