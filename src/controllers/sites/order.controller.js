const Order = require('../../models/Order');
const PackageStatistics = require('../../models/PackageStatistics');
const ProductStatistics = require('../../models/ProductStatistics');
const utils = require('../../utils/functions');
module.exports = {
    // getAll: async (req, res) => {
    //     try {
    //         const categories = await Category.find({});
    //         categories = categories.map((category) => category.toObject());

    //         res.json({ status: 'success', data: categories });

    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({
    //             status: 'Server Error',
    //             message: 'Có lỗi xảy ra, vui lòng thử lại!!',
    //             errorCode: 'SERVER_ERROR',
    //         });
    //     }
    // },
    create: async (req, res) => {
        try {
            // tạm
            req.body.quantity = 1;
            req.body.paymentMethod = 'cash';

            let detail = req.body.productList.map((product) => {
                return {
                    product: product.product._id,
                    quantity: product.quantity,
                    price: product.product.price,
                };
            });
            let order = new Order({
                user: '62a535ef1abf9f2d83c459de',
                item: req.body._id,
                type: req.body.productList ? 'Package' : 'Product',
                detail: detail,
                totalPrice: req.body.totalAmount,
                orderTime: new Date(),
                paymentMethod: req.body.paymentMethod,
                deliveryAddress: req.body.address,
                status: 'pending',
                phone: req.body.phone,
                quantity: req.body.quantity,
            });
            await order.save();

            // statistics
            // update package statistics
            if (req.body.productList) {
                const packageStatistics = await PackageStatistics.findOneAndUpdate(
                    { package: req.body._id },
                    { $inc: { totalSold: req.body.quantity } },
                    { new: true }
                );

                if (!packageStatistics) {
                    const packageStatistics = new PackageStatistics({
                        package: req.body._id,
                        totalSold: req.body.quantity,
                    });
                    await packageStatistics.save();
                }

                // update product statistics
                req.body.productList.forEach(async (product) => {
                    const productStatistics = await ProductStatistics.findOneAndUpdate(
                        { product: product.product._id },
                        { $inc: { totalSold: product.quantity } },
                        { new: true }
                    );

                    if (!productStatistics) {
                        const productStatistics = new ProductStatistics({
                            product: product.product._id,
                            totalSold: product.quantity,
                        });
                        await productStatistics.save();
                    }
                });
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
};
