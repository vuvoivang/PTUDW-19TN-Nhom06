const { products, packages } = require('../models/manager.model');
const path = "layouts/manager";
const Category = require('../models/Category');
const { mapObjectInArray } = require('../utils/functions');

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
            // render 500 with status and json 500
            res.render("/error/500");
        }
    },

    addCategory: async (req, res) => {
        const { name, image } = req.body
        try {
            if (!name || !image) {
                return res.status(400).json({
                    success: false,
                    message: 'Vui lòng nhập đầy đủ thông tin',
                    errorCode: "INVALID_DATA"
                })
            }

            let category = await Category.findOne({ name });
            if (category) {
                return res.status(400).json({
                    success: false,
                    message: 'Danh mục đã tồn tại',
                    errorCode: "CATEGORY_EXIST"
                })
            }

            let newCategory = await Category.create({ name, image });
            res.status(201).json({
                success: true,
                message: 'Thêm danh mục thành công',
                data: newCategory
            })
            return res.redirect('/manager/categoryManagement');
        } catch (err) {
            console.log(err.message);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            })
        }
    },

    updateCategory: async (req, res) => {
    },

    deleteCategory: async (req, res) => {
    },

    // product
    getProductManagement: (req, res) => {
        res.render(`${path}/productManagement`, {
            layout: "manager/main",
            tag: "product",
            products
        })
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
    getPackageManagement: (req, res) => {
        res.render(`${path}/packageManagement`, {
            layout: "manager/main",
            tag: "package",
            packages
        })
    },

    addPackage: (req, res) => {
        res.render(`${path}/addPackage`, {
            layout: "manager/main",
            tag: "package",
            products
        })
    },

    detailPackage: (req, res) => {
        res.render(`${path}/detailPackage`, {
            layout: "manager/main",
            tag: "package",
            products
        })
    },

    // payment
    getPaymentManagement: (req, res) => {
        res.render(`${path}/paymentManagement`, {
            layout: "manager/main",
            tag: "payment"
        })
    }
}
