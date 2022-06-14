const Category = require('../../models/Category');
const utils = require('../../utils/functions');
module.exports = {
    getAll: async (req, res) => {
        try {
            const categories = await Category.find({});
            categories = categories.map((category) => category.toObject());

            res.json({ status: 'success', data: categories });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 'Server Error',
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: 'SERVER_ERROR',
            });
        }
    },
    // get: async (req, res) => {
    //     try {
    //         const category = await Category.findById(req.params.id);
    //         res.json({ status: 'success', data: category });
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
            if (!req.file) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Không có file ảnh',
                    errorCode: 'NO_IMAGE',
                });
            }
            const timestamp = Date.now();
            const name = req.file.originalname.split('.')[0];
            const type = req.file.originalname.split('.')[1];
            const filename = `${name}_${timestamp}.${type}`;

            url = await utils.uploadFile(req, 'categories/' + filename);

            const category = new Category({
                name: req.body.name,
                image: url[0],
            });
            await category.save();

            res.json({ status: 'success', data: category });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 'Server Error',
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: 'SERVER_ERROR',
            });
        }
    },
    // update: async (req, res) => {
    //     try {
    //         const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    //         res.json({ status: 'success', data: category });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({
    //             status: 'Server Error',
    //             message: 'Có lỗi xảy ra, vui lòng thử lại!!',
    //             errorCode: 'SERVER_ERROR',
    //         });
    //     }
    // },
    // delete: async (req, res) => {
    //     try {
    //         const category = await Category.findByIdAndDelete(req.params.id);
    //         res.json({ status: 'success', data: category });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({
    //             status: 'Server Error',
    //             message: 'Có lỗi xảy ra, vui lòng thử lại!!',
    //             errorCode: 'SERVER_ERROR',
    //         });
    //     }
    // },
};
