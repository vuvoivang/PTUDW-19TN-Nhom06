const homeRoute = require('./sites/home.route');
const categoryRoute = require('./sites/category.route');
const productRoute = require('./sites/product.route');
const packageRoute = require('./sites/package.route');
const adminRoute = require('./admin.route');
const userRoute = require('./user.route');
const managerRoute = require('./manager.route');
const authRoute = require('./sites/auth.route');
const dbRoute = require('./sites/db.route');
const bankingRoute = require('./banking.route');
const locationRoute = require('./sites/location.route');

function route(app) {
    app.use('/category', categoryRoute);
    app.use('/product', productRoute);
    app.use('/package', packageRoute);
    app.use('/admin', adminRoute);
    app.use('/manager', managerRoute);
    app.use('/user', userRoute);
    app.use('/api/v1/authentication', authRoute);
    app.use('/api/v1/manager', dbRoute);
    app.use('/api/v1/location', locationRoute);
    app.use('/banking', bankingRoute);
    app.use('/', homeRoute);
    app.use((req, res, next) => {
        res.render('error/404');
    });
}

module.exports = route;
