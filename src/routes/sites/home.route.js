const express = require('express');
const router = express.Router();

const homeController = require('../../controllers/sites/home.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.use(authMiddleware.checkLoggedIn);

router.get("/signin", homeController.signIn);
router.get("/signup", homeController.signUp);
router.route('/authorize').get(homeController.authorize);
router.get('/', homeController.get);

module.exports = router;