const path = "layouts/manager";
const Product = require('../../models/Product');
const Package = require('../../models/Package');
const utils = require('../../utils/functions');

module.exports = {
    getPackageManagement: async (req, res) => {
        // get All Packages
        try {
            let packages = await Package.find({}).populate("productList")
            packages = utils.mapObjectInArray(packages);
            let view = req.query.view || "table"
            let switchView = view === "table" ? "card" : "table";
            res.render(`${path}/packageManagement`, {
                layout: "manager/main",
                tag: "package",
                packages,
                view,
                switchView
            });
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    getAddPackage: async (req, res) => {
        try {
            let products = await Product.find({}).populate('category');
            products = utils.mapObjectInArray(products);
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

    addPackage: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Chưa có ảnh nào được tải lên',
                    errorCode: "INVALID_DATA"
                })
            }

            const package = await Package.findOne({ name: req.body.name });
            if (package) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Gói nhu yếu phẩm đã tồn tại',
                    errorCode: "PACKAGE_EXIST"
                })
            }

            const productList = req.body.productList.split(",").map(item => {
                let [product, limitPerPackage] = item.split("-");
                return {
                    product: parseInt(product),
                    limitPerPackage: parseInt(limitPerPackage)
                }
            });

            if (productList.length <= 1) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Số lượng nhu yếu phẩm phải lớn hơn 1',
                    errorCode: "NOT_ENOUGH_PRODUCT",
                })
            }

            let totalPrice = 0;
            for (let product of productList) {
                const productItem = await Product.findById(product.product);
                totalPrice += productItem.price * product.limitPerPackage;
            }

            const image = await utils.createUrlFromImageName(req.file, "packages");
            const newPackage = new Package({
                name: req.body.name,
                limitPerPerson: req.body.limitPerPerson,
                limitTime: req.body.limitTime,
                image,
                productList,
                defaultPrice: totalPrice,
                description: req.body.description || "",
            });
            await newPackage.save();

            return res.status(201).json({
                status: 'success',
                message: 'Thêm gói nhu yếu phẩm thành công',
                data: newPackage
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

    detailPackage: async (req, res) => {
        try {
            const id = req.params.id;
            let package = await Package.findById(id);
            if (!package) {
                return res.render("error/404");
            }
            package = package.toObject();
            let productData = "";
            package.productList.forEach((product) => {
                productData += product.product + "-" + product.limitPerPackage + ", ";
            })
            productData = productData.slice(0, -2);
            package.productData = productData;

            let products = await Product.find({}).populate('category');
            products = utils.mapObjectInArray(products);
            res.render(`${path}/detailPackage`, {
                layout: "manager/main",
                tag: "package",
                package,
                products
            });
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    updatePackage: async (req, res) => {
        try {
            const id = req.params.id;
            let package = await Package.findById(id);
            if (!package) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Gói nhu yếu phẩm không tồn tại',
                    errorCode: "PACKAGE_NOT_FOUND"
                })
            }

            const existPackage = await Package.findOne({ name: req.body.name, _id: { $ne: id } });
            if (existPackage) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Gói nhu yếu phẩm đã tồn tại',
                    errorCode: "PACKAGE_EXIST"
                })
            }

            if (!req.body.productList || req.body.productList.length <= 1) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Số lượng nhu yếu phẩm phải lớn hơn 1',
                    errorCode: "NOT_ENOUGH_PRODUCT",
                })
            }

            const productList = req.body.productList.split(",").map(item => {
                let [product, limitPerPackage] = item.split("-");
                return {
                    product: parseInt(product),
                    limitPerPackage: parseInt(limitPerPackage)
                }
            });

            if (productList.length <= 1) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Số lượng nhu yếu phẩm phải lớn hơn 1',
                    errorCode: "NOT_ENOUGH_PRODUCT",
                })
            }

            const totalPrice = await productList.reduce(async (total, item) => {
                let product = await Product.findById(item.product);
                return total + product.price * item.limitPerPackage;
            }, 0);

            package.name = req.body.name;
            package.limitPerPerson = req.body.limitPerPerson;
            package.limitTime = req.body.limitTime;
            package.description = req.body.description || "";
            package.productList = productList;
            package.defaultPrice = totalPrice;
            if (req.file) {
                package.image = await utils.createUrlFromImageName(req.file, "packages");
            }
            await package.save();
            res.status(200).json({
                status: 'success',
                message: 'Cập nhật gói nhu yếu phẩm thành công',
                data: package
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

    deletePackage: async (req, res) => {
        try {
            const id = req.params.id;
            const package = await Package.findById(id);
            if (!package) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Gói nhu yếu phẩm không tồn tại',
                    errorCode: "PACKAGE_NOT_FOUND"
                })
            }
            await package.remove();
            res.status(200).json({
                status: 'success',
                message: 'Xóa gói nhu yếu phẩm thành công',
                data: package
            })
        } catch (err) {
            console.log(err.message);
            res.status(500).json({
                status: 'Server Error',
                message: 'Có lỗi xảy ra, vui lòng thử lại!!',
                errorCode: "SERVER_ERROR"
            })
        }
    }
}