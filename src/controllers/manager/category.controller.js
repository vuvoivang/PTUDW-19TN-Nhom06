const path = "layouts/manager";
const Category = require('../../models/Category');
const Product = require('../../models/Product');
const utils = require('../../utils/functions');

module.exports = {
    getCategoryManagement: async (req, res) => {
        // get All Categories
        try {
            let categories = await Category.find({});
            categories = utils.mapObjectInArray(categories);
            res.render(`${path}/categoryManagement`, {
                layout: "manager/main",
                tag: "category",
                categories
            });
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    addCategory: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Chưa có ảnh nào được tải lên',
                    errorCode: "INVALID_DATA"
                })
            }

            let category = await Category.findOne({ name: req.body.name });
            if (category) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Danh mục đã tồn tại',
                    errorCode: "CATEGORY_EXIST"
                })
            }

            let image = await utils.createUrlFromImageName(req.file, "categories");
            const newCategory = new Category({
                name: req.body.name,
                image: image,
            });
            await newCategory.save();

            return res.status(201).json({
                status: 'success',
                message: 'Thêm danh mục thành công',
                data: newCategory
            })
        } catch (err) {
            console.log(err.message);
            res.status(500).json({
                status: 'Server Error',
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            })
        }
    },

    updateCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const category = await Category.findById(id);
            if (!category) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Danh mục không tồn tại',
                    errorCode: 'CATEGORY_NOT_FOUND'
                });
            }

            let categoryExist = await Category.findOne({ name: req.body.name, _id: { $ne: id } });
            if (categoryExist) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Danh mục đã tồn tại',
                    errorCode: "CATEGORY_EXIST"
                })
            }

            category.name = req.body.name;
            if (req.file) {
                await utils.deleteFileFromURL(category.image);
                category.image = await utils.createUrlFromImageName(req.file, "categories");
            }
            await category.save();
            res.status(200).json({
                status: 'success',
                message: 'Cập nhật danh mục thành công',
                data: category
            })

        } catch (err) {
            console.log(err.message);
            res.status(500).json({
                status: 'Server Error',
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            })
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const category = await Category.findById(id);
            if (!category) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Danh mục không tồn tại',
                    errorCode: 'CATEGORY_NOT_FOUND'
                });
            }

            // check if category is use in product model
            const product = await Product.findOne({ category: id });
            if (product) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Danh mục đang được sử dụng',
                    errorCode: 'CATEGORY_USED'
                });
            }

            await utils.deleteFileFromURL(category.image);
            await category.remove();
            res.status(200).json({
                status: 'success',
                message: 'Xóa danh mục thành công',
                data: category
            })
        } catch (err) {
            console.log(err.message);
            res.status(500).json({
                status: 'Server Error',
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            })
        }
    },

}