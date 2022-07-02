const express = require('express');
const { upload } = require('../config/firebase');
const router = express.Router();

const managerController = require('../controllers/manager.controller');
const authController = require('../controllers/sites/auth.controller');

router.use(authController.isLoggedIn, authController.firewallUrlHandle)

router.get("/", managerController.get); // default

router.get("/", managerController.get); // default

// patient management
router.get("/patient-management", managerController.patient.getPatientManagement);

// category management
router.get("/category-management", managerController.category.getCategoryManagement);
router.post("/category-management", upload.single('image'), managerController.category.addCategory);
router.put("/category-management/:id", upload.single('image'), managerController.category.updateCategory);
router.delete("/category-management/:id", managerController.category.deleteCategory);

// product management
router.get("/product-management", managerController.product.getProductManagement);
router.get("/product-management/new", managerController.product.getAddProduct);
router.post("/product-management", upload.array("images"), managerController.product.addProduct);
router.get("/product-management/:id", managerController.product.detailProduct);
router.put("/product-management/:id", upload.array('images'), managerController.product.updateProduct);
router.delete("/product-management/:id", managerController.product.deleteProduct);

// package management
router.get("/package-management", managerController.package.getPackageManagement);
router.get("/package-management/new", managerController.package.getAddPackage);
router.post("/package-management", upload.single("image"), managerController.package.addPackage);
router.get("/package-management/:id", managerController.package.detailPackage);
router.put("/package-management/:id", upload.single("image"), managerController.package.updatePackage);
router.delete("/package-management/:id", managerController.package.deletePackage);

// payment management
router.get("/payment-management", managerController.payment.getPaymentManagement);

module.exports = router;
