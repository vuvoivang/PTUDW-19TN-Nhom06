const homeRoute = require('./sites/home.route');
const categoryRoute = require('./sites/category.route');
const productRoute = require('./sites/product.route');
const packageRoute = require('./sites/package.route');
const orderRoute = require('./sites/order.route');
const adminRoute = require('./admin.route');
const userRoute = require('./user.route');
const managerRoute = require('./manager.route');
const bankingRoute = require('./banking.route');

function route(app) {
    app.use('/category', categoryRoute);
    app.use('/product', productRoute);
    app.use('/package', packageRoute);
    app.use('/order', orderRoute);
    app.use('/admin', adminRoute);
    app.use('/manager', managerRoute);
    app.use('/user', userRoute);
    app.use('/banking', bankingRoute);
    app.use('/', homeRoute);
    app.use((req, res, next) => {
        res.render('error/404');
    });
}

module.exports = route;
