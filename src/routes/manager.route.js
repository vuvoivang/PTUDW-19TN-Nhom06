const express = require('express');
const { upload } = require('../config/firebase');
const router = express.Router();

const managerController = require('../controllers/manager.controller');
const authController = require('../controllers/sites/auth.controller');

router.use(authController.isLoggedIn, authController.firewallUrlHandle)

router.get("/", managerController.get); // default

router.get("/", managerController.get); // default

// patient management
router.get("/patient-management", managerController.getPatientManagement);

// category management
router.get("/category-management", managerController.getCategoryManagement);
// router.post("/category-management", upload.single('image'), managerController.addCategory);
// router.put("/category-management/:id", upload.single('image'), managerController.updateCategory);
// router.delete("/category-management/:id", managerController.deleteCategory);

// product management
router.get("/product-management", managerController.getProductManagement);
router.get("/product-management/new", managerController.addProduct);
// router.post("/product-management", upload.array("images"), managerController.addProduct);
router.get("/product-management/:id", managerController.detailProduct);
// router.put("/product-management/:id", upload.array('images'), managerController.updateProduct);
// router.delete("/product-management/:id", managerController.deleteProduct);

// package management
router.get("/package-management", managerController.getPackageManagement);
router.get("/package-management/new", managerController.addPackage);
// router.post("/package-management", upload.single("image"), managerController.addPackage);
router.get("/package-management/:id", managerController.detailPackage);
// router.put("/package-management/:id", upload.single("image"), managerController.updatePackage);
// router.delete("/package-management/:id", managerController.deletePackage);

// payment management
router.get("/payment-management", managerController.getPaymentManagement);

module.exports = router;
