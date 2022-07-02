const path = "layouts/manager";
const Category = require('../../models/Category');
const Product = require('../../models/Product');
const Package = require('../../models/Package');
const utils = require('../../utils/functions');

module.exports = {
    getProductManagement: async (req, res) => {
        // get All Products 
        try {
            let products = await Product.find({}).populate('category');
            products = utils.mapObjectInArray(products);
            let view = req.query.view || "table"
            let switchView = view === "table" ? "card" : "table";
            res.render(`${path}/productManagement`, {
                layout: "manager/main",
                tag: "product",
                products,
                view,
                switchView
            });
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    getAddProduct: async (req, res) => {
        try {
            let categories = await Category.find({});
            categories = utils.mapObjectInArray(categories);
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
            if (!req.files) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Chưa có ảnh nào được tải lên',
                    errorCode: "INVALID_DATA"
                })
            }

            let product = await Product.findOne({ name: req.body.name });
            if (product) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Nhu yếu phẩm đã tồn tại',
                    errorCode: "PRODUCT_EXIST"
                })
            }

            let images = await Promise.all(req.files.map(async (file) => await utils.createUrlFromImageName(file, "products")));
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
                message: 'Thêm nhu yếu phẩm thành công',
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
            if (!product) {
                return res.render("error/404");
            }
            product = product.toObject();
            let categories = await Category.find({});
            categories = utils.mapObjectInArray(categories);

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
                    message: 'Nhu yếu phẩm không tồn tại',
                    errorCode: 'PRODUCT_NOT_FOUND'
                });
            }

            let productExist = await Product.findOne({ name: req.body.name, _id: { $ne: id } });
            if (productExist) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Nhu yếu phẩm đã tồn tại',
                    errorCode: "PRODUCT_EXIST"
                })
            }

            product.name = req.body.name;
            product.price = req.body.price;
            product.category = req.body.category;
            product.unit = req.body.unit;
            product.description = req.body.description || "";
            if (req.files) {
                let images = await Promise.all(req.files.map(async (file) => await utils.createUrlFromImageName(file, "products")));
                product.images = product.images.concat(images);
            }
            await product.save();
            res.status(200).json({
                status: 'success',
                message: 'Cập nhật nhu yếu phẩm thành công',
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
            const product = await Product.findById(id);
            if (!product) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Nhu yếu phẩm không tồn tại',
                    errorCode: 'PRODUCT_NOT_FOUND'
                });
            }

            const package = await Package.findOne({ productList: { $elemMatch: { product: id } } });
            if (package) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Nhu yếu phẩm đang được sử dụng trong gói',
                    errorCode: 'PRODUCT_USED_IN_PACKAGE'
                });
            }

            await product.remove();
            res.status(200).json({
                status: 'success',
                message: 'Xóa nhu yếu phẩm thành công',
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
}