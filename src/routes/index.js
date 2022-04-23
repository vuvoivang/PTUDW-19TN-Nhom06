const homeRoute = require('./sites/home.route');
const categoryRoute = require('./sites/category.route');
const productRoute = require('./sites/product.route');
const adminRoute = require('./admin.route');
const userRoute = require('./user.route');
const managerRoute = require('./manager.route');

function route(app) {

    app.use('/category', categoryRoute);
    app.use('/product', productRoute);
    app.use('/admin', adminRoute);
    app.use('/manager', managerRoute);
    app.use('/user', userRoute);
    app.use('/', homeRoute);
    app.use((req, res, next) => {
        res.render('error/404')
    })

}

module.exports = route;
