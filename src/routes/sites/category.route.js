const express = require('express');
const router = express.Router();
const firebase = require('../../config/firebase');
const categoryController = require('../../controllers/sites/category.controller');

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.get);
router.post('/',firebase.upload.single('image'), categoryController.create);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

module.exports = router;