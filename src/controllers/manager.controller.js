const path = "layouts/manager";
const Category = require('../models/Category');
const Product = require('../models/Product');
const Package = require('../models/Package');
const { mapObjectInArray } = require('../utils/functions');
const utils = require('../utils/functions');

module.exports = {
    get: (req, res) => {
        res.render(`${path}/main`, {
            main: true,
            tag: "patient"
        });
    },

    // patient
    getPatientManagement: (req, res) => {
        res.render(`${path}/patientManagement`, {
            layout: "manager/main",
            tag: "patient"
        });
    },

    // category
    getCategoryManagement: async (req, res) => {
        // get All Categories
        try {
            let categories = await Category.find({});
            categories = mapObjectInArray(categories);
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
            console.log("req.body", req.body)
            console.log("req.file", req.file)
            if (!req.body.name || !req.file) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Vui lòng nhập đầy đủ thông tin',
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

            image = await utils.createUrlFromImageName(req.file, "categories");
            let newCategory = await Category.create({
                name: req.body.name,
                image: image
            });
            res.status(201).json({
                status: 'success',
                message: 'Thêm danh mục thành công',
                data: newCategory
            })
            return res.redirect('/manager/categoryManagement');
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

            if (!req.body.name) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Vui lòng nhập đầy đủ thông tin',
                    errorCode: "INVALID_DATA"
                })
            }

            let categoryExist = await Category.findOne({ name: req.body.name });
            if (categoryExist && categoryExist._id != id) {
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

    // product
    getProductManagement: async (req, res) => {
        // get All Products 
        try {
            let products = await Product.find({}).populate('category');
            products = mapObjectInArray(products);
            res.render(`${path}/productManagement`, {
                layout: "manager/main",
                tag: "product",
                products
            });
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    addProduct: (req, res) => {
        res.render(`${path}/addProduct`, {
            layout: "manager/main",
            tag: "product"
        })
    },

    detailProduct: (req, res) => {
        res.render(`${path}/detailProduct`, {
            layout: "manager/main",
            tag: "product"
        })
    },

    // package
    getPackageManagement: async (req, res) => {
        // get All Packages
        try {
            let packages = await Package.find({}).populate("productList")
            console.log(packages);
            packages = mapObjectInArray(packages);
            res.render(`${path}/packageManagement`, {
                layout: "manager/main",
                tag: "package",
                packages
            });
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    addPackage: async (req, res) => {
        try {
            let products = await Product.find({}).populate('category');
            products = mapObjectInArray(products);
            res.render(`${path}/addPackage`, {
                layout: "manager/main",
                tag: "package",
                products
            });
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    detailPackage: async (req, res) => {
        try {
            let products = await Product.find({}).populate('category');
            products = mapObjectInArray(products);
            res.render(`${path}/detailPackage`, {
                layout: "manager/main",
                tag: "package",
                products
            });
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    // payment
    getPaymentManagement: (req, res) => {
        res.render(`${path}/paymentManagement`, {
            layout: "manager/main",
            tag: "payment"
        })
    }
}
