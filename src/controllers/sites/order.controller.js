const Order = require('../../models/Order');
const PackageStatistics = require('../../models/PackageStatistics');
const Product = require('../../models/Product');
const ProductStatistics = require('../../models/ProductStatistics');
const Package = require('../../models/Package');
const utils = require('../../utils/functions');
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
            let detail = req.body.productList.map((product) => {
                return {
                    product: product.product._id,
                    quantity: product.quantity,
                    price: product.product.price,
                };
            });
            now = utils.getDate();
            let order = new Order({
                user: '62a535ef1abf9f2d83c459de',
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
            console.log(result);
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
