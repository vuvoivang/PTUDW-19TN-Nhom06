const express = require('express');
const router = express.Router();
const firebase = require('../../config/firebase');
const categoryController = require('../../controllers/sites/category.controller');
const authMiddleware = require('../../middlewares/auth.middleware');



router.get('/:id', authMiddleware.checkLoggedIn,categoryController.getPackageByCategory);
router.get('/', categoryController.getAll);
router.post('/',firebase.upload.single('image'), categoryController.create);

module.exports = router;