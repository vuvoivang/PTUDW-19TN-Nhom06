const utils = require('../../utils/functions');
const Product = require('../../models/Product');

module.exports = {
    get: async (req, res) => {
        // TODO: ref

        const id = req.params.id;
        let product = await Product.findById(id);
        product = product.toObject();

        res.render('layouts/sites/product', {
            layout: 'sites/main',
            product,
        });
    },
    create: async (req, res) => {
        try {
            if (!req.files) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Không có file ảnh',
                    errorCode: 'NO_IMAGE',
                });
            }
            // TODO: check category exist
            images = await Promise.all(
                req.files.map(async (file) => {
                    const timestamp = Date.now();
                    const name = file.originalname.split('.')[0];
                    const type = file.originalname.split('.')[1];
                    const filename = `${name}_${timestamp}.${type}`;
                    url = await utils.uploadFile(file, 'products/' + filename);
                    return url[0];
                })
            );
            const product = new Product({
                name: req.body.name,
                price: req.body.price,
                unit: req.body.unit,
                category: req.body.category,
                description: req.body.description,
                images: images,
            });
            await product.save();
            res.json({ status: 'success', data: product });
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
