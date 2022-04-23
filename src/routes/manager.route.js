const express = require('express');
const router = express.Router();

const managerController = require('../controllers/manager.controller');

// patient management
// router.get("/", managerController.get); // default
router.get("/", managerController.getProductManagement);    // temporary


// category management

// product management
router.get("/product-management", managerController.getProductManagement);
router.get("/product-management/create", managerController.createProduct);

// package management

// payment management

module.exports = router;
