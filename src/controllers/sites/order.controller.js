const Order = require('../../models/Order');
const PackageStatistics = require('../../models/PackageStatistics');
const Product = require('../../models/Product');
const ProductStatistics = require('../../models/ProductStatistics');
const Package = require('../../models/Package');
const PaymentAccount = require('../../models/PaymentAccount');
const utils = require('../../utils/functions');
const Transaction = require('../../models/Transaction');
module.exports = {
    findByUserId: async (req, res) => {
        try {
            const userId = req.user._id;
            const orders = await Order.find({ user: userId });
            res.json({ status: 'success', data: orders });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 'Server Error',
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: 'SERVER_ERROR',
            });
        }
    },
    create: async (req, res) => {
        try {
            let paymentAccount = null;
            if (req.body.paymentMethod == 'credit-card') {
                paymentAccount = await PaymentAccount.findOne({ paymentAccountId: req.userId }).select('+password');
                if (!paymentAccount) {
                    return res.status(400).json({
                        status: 'Payment account not found',
                        message: 'Vui lòng tạo tài khoản thanh toán trước khi đặt hàng',
                        errorCode: 'PAYMENT_ACCOUNT_NOT_FOUND',
                    });
                }
                let checkPassword = await paymentAccount.correctPassword(
                    req.body.passwordAccountPayment,
                    paymentAccount.password
                );
                if (!checkPassword) {
                    return res.status(400).json({
                        status: 'Wrong password',
                        message: 'Mật khẩu Payment Account không đúng',
                        errorCode: 'WRONG_PASSWORD',
                    });
                }
            }
            let detail = req.body.productList.map((product) => {
                return {
                    product: product.product._id,
                    quantity: product.quantity,
                    price: product.product.price,
                };
            });
            now = utils.getDate();
            let order = new Order({
                user: req.userId,
                item: req.body._id,
                type: req.body.productList ? 'Package' : 'Product',
                detail: detail,
                totalPrice: req.body.totalAmount,
                orderTime: new Date(),
                paymentMethod: req.body.paymentMethod,
                deliveryAddress: req.body.address,
                status: 'delivered',
                phone: req.body.phone,
                quantity: req.body.packageQuantity,
            });

            if (paymentAccount) {
                order.paymentAccount = paymentAccount._id;
                order.paymentTime = new Date();
            }
            await order.save();

            // statistics
            // update package statistics
            if (req.body.productList) {
                const packageStatistics = await PackageStatistics.findOneAndUpdate(
                    { package: req.body._id, date: now },
                    { $inc: { totalSold: req.body.packageQuantity } },
                    { new: true }
                );

                if (!packageStatistics) {
                    const packageStatistics = new PackageStatistics({
                        package: req.body._id,
                        totalSold: req.body.packageQuantity,
                        date: now,
                    });
                    await packageStatistics.save();
                }

                // update product statistics
                req.body.productList.forEach(async (product) => {
                    const productStatistics = await ProductStatistics.findOneAndUpdate(
                        { product: product.product._id, date: now },
                        { $inc: { totalSold: product.quantity } },
                        { new: true }
                    );

                    if (!productStatistics) {
                        const productStatistics = new ProductStatistics({
                            product: product.product._id,
                            totalSold: product.quantity,
                            date: now,
                        });
                        await productStatistics.save();
                    }
                });
            }
            //============
            // create transaction
            if (paymentAccount) {
                let transaction = new Transaction({
                    accountId: paymentAccount._id,
                    amount: req.body.totalAmount,
                    type: 'payment',
                    description: 'Thanh toán đơn hàng ' + order._id.toString(),
                });
                await transaction.save();
            }
            res.json({ status: 'success', data: order });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 'Server Error',
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: 'SERVER_ERROR',
            });
        }
    },
    statisticProductByMonth: async (req, res) => {
        try {
            let productStatistics = await ProductStatistics.find({});

            let products = new Set(productStatistics.map((statistics) => statistics.product));
            let result = {};
            for (const product of products) {
                // find product
                const productDetail = await Product.findById(product);
                result[productDetail.name] = {
                    '01/2022': 0,
                    '02/2022': 0,
                    '03/2022': 0,
                    '04/2022': 0,
                    '05/2022': 0,
                    '06/2022': 0,
                    '07/2022': 0,
                };
                productStatistics.forEach((statistics) => {
                    if (product == statistics.product) {
                        const month = statistics.date.substring(3);
                        result[productDetail.name][month] += statistics.totalSold;
                    }
                });
            }
            // console.log(result);
            res.json({ status: 'success', data: result });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 'Server Error',
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: 'SERVER_ERROR',
            });
        }
    },
    statisticsPackageByMonth: async (req, res) => {
        try {
            let packageStatistics = await PackageStatistics.find({});

            let packages = new Set(packageStatistics.map((statistics) => statistics.package));
            let result = {};
            for (const package of packages) {
                // find package
                const packageDetail = await Package.findById(package);
                result[packageDetail.name] = {
                    '01/2022': 0,
                    '02/2022': 0,
                    '03/2022': 0,
                    '04/2022': 0,
                    '05/2022': 0,
                    '06/2022': 0,
                    '07/2022': 0,
                };
                packageStatistics.forEach((statistics) => {
                    if (package == statistics.package) {
                        const month = statistics.date.substring(3);
                        result[packageDetail.name][month] += statistics.totalSold;
                    }
                });
            }
            // console.log(result);
            res.json({ status: 'success', data: result });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 'Server Error',
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: 'SERVER_ERROR',
            });
        }
    },
};
