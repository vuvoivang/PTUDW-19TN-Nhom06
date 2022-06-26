const path = "layouts/manager";
const Category = require('../models/Category');
const Product = require('../models/Product');
const Package = require('../models/Package');
const { mapObjectInArray } = require('../utils/functions');
const utils = require('../utils/functions');

module.exports = {
    get: (req, res) => {
        res.redirect('/manager/patient-management');
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

            let image = utils.createUrlFromImageName(req.file, "categories");
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
                utils.deleteFileFromURL(category.image);
                category.image = utils.createUrlFromImageName(req.file, "categories");
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

            utils.deleteFileFromURL(category.image);
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

    getAddProduct: async (req, res) => {
        try {
            let categories = await Category.find({});
            categories = mapObjectInArray(categories);
            res.render(`${path}/addProduct`, {
                layout: "manager/main",
                tag: "product",
                categories
            });
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    addProduct: async (req, res) => {
        try {
            if (!req.body.name || !req.body.price || !req.body.category || !req.body.unit || !req.files) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Vui lòng nhập đầy đủ thông tin',
                    errorCode: "INVALID_DATA"
                })
            }

            let product = await Product.findOne({ name: req.body.name });
            if (product) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Sản phẩm đã tồn tại',
                    errorCode: "PRODUCT_EXIST"
                })
            }

            let images = await Promise.all(req.files.map((file) => utils.createUrlFromImageName(file, "products")));
            const newProduct = new Product({
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                unit: req.body.unit,
                images: images,
                description: req.body.description || ""
            });
            await newProduct.save();

            return res.status(201).json({
                status: 'success',
                message: 'Thêm sản phẩm thành công',
                data: newProduct
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

    detailProduct: async (req, res) => {
        try {
            const id = req.params.id;
            let product = await Product.findById(id);
            product = product.toObject();
            if (!product) {
                return res.render("error/404");
            }
            let categories = await Category.find({});
            categories = mapObjectInArray(categories);

            res.render(`${path}/detailProduct`, {
                layout: "manager/main",
                tag: "product",
                product,
                categories
            });
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    updateProduct: async (req, res) => {
        try {
            const id = req.params.id;
            let product = await Product.findById(id);
            if (!product) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Sản phẩm không tồn tại',
                    errorCode: 'PRODUCT_NOT_FOUND'
                });
            }

            if (!req.body.name || !req.body.price || !req.body.category || !req.body.unit) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Vui lòng nhập đầy đủ thông tin',
                    errorCode: "INVALID_DATA"
                })
            }

            let productExist = await Product.findOne({ name: req.body.name });
            if (productExist && productExist._id != id) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Sản phẩm đã tồn tại',
                    errorCode: "PRODUCT_EXIST"
                })
            }

            product.name = req.body.name;
            product.price = req.body.price;
            product.category = req.body.category;
            product.unit = req.body.unit;
            product.description = req.body.description || "";
            if (req.files) {
                let images = Promise.all(req.files.map((file) => utils.createUrlFromImageName(file, "products")));
                product.images.concat(images);
            }
            await product.save();
            res.status(200).json({
                status: 'success',
                message: 'Cập nhật sản phẩm thành công',
                data: product
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

    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id;
            let product = await Product.findById(id);
            if (!product) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Sản phẩm không tồn tại',
                    errorCode: 'PRODUCT_NOT_FOUND'
                });
            }
            await product.remove();
            res.status(200).json({
                status: 'success',
                message: 'Xóa sản phẩm thành công',
                data: product
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
