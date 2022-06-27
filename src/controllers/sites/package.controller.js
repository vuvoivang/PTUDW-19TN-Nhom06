const utils = require('../../utils/functions');
const Package = require('../../models/Package');
const Product = require('../../models/Product');
const date = require('date-and-time')
module.exports = {
    getPayment: async (req, res) => {
        const id = req.params.id;
        let package = await Package.findById(id)
            .populate('productList')
            .populate({
                path: 'productList',
                populate: { path: 'product' },
            });
        if (!package) {
            return res.status(404).json({
                status: 'Not Found',
                message: 'Không tìm thấy gói',
                errorCode: 'NOT_FOUND',
            });
        }
        package = package.toObject();
        package._id = package._id.toString();

        res.render('layouts/sites/packagePayment', {
            layout: 'sites/main',
            package,
        });
    },
    get: async (req, res) => {
        // TODO: ref

        const id = req.params.id;
        let package = await Package.findById(id)
            .populate('productList')
            .populate({
                path: 'productList',
                populate: { path: 'product' },
            });
        if (!package) {
            return res.status(404).json({
                status: 'Not Found',
                message: 'Không tìm thấy gói',
                errorCode: 'NOT_FOUND',
            });
        }
        package = package.toObject();
        res.render('layouts/sites/package', {
            layout: 'sites/main',
            package,
        });
    },
    create: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Không có file ảnh',
                    errorCode: 'NO_IMAGE',
                });
            }
            // TODO: check product exist

            const timestamp = Date.now();
            const name = req.file.originalname.split('.')[0];
            const type = req.file.originalname.split('.')[1];
            const filename = `${name}_${timestamp}.${type}`;
            url = await utils.uploadFile(req.file, 'packages/' + filename);

            productList = req.body.productList.map((product) => {
                return JSON.parse(product);
            });
            // calc total price
            let totalPrice = 0;
            for (let product of productList) {
                const productItem = await Product.findById(product.product);
                if (!productItem) {
                    return res.status(404).json({
                        status: 'Not Found',
                        message: 'Không tìm thấy sản phẩm',
                        errorCode: 'NOT_FOUND',
                    });
                }
                totalPrice += productItem.price;
            };
            const package = new Package({
                name: req.body.name,
                limitPerPerson: req.body.limitPerPerson,
                limitTime: req.body.limitTime,
                productList,
                image: url[0],
                defaultPrice: totalPrice,
            });

            await package.save();
            res.json({ status: 'success', data: package });
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
