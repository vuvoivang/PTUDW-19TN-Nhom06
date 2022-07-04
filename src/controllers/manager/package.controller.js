const path = "layouts/manager";
const Product = require('../../models/Product');
const Package = require('../../models/Package');
const Order = require('../../models/Order');
const utils = require('../../utils/functions');
const { hyperlinksSidebarManager, managerBreadCrumb } = require('../../constants/index');
const Account = require('../../models/Account');

const pushBreadCrumb = (label, link, isActive = true) => {
    let thisBreadCrumb = {};
    Object.assign(thisBreadCrumb, managerBreadCrumb);
    thisBreadCrumb.path = [...managerBreadCrumb.path];
    thisBreadCrumb.path.push({
        label,
        link,
        isActive
    })
    thisBreadCrumb.mainLabel = label;
    return thisBreadCrumb;
};

module.exports = {
    getPackageManagement: async (req, res) => {
        // get All Packages
        try {
            res.locals.hyperlinks = hyperlinksSidebarManager('package-management');
            res.locals.breadCrumb = pushBreadCrumb("Quản lý gói", '/manager/package-management');
            const decoded = await jwt.decode(req.cookies.token, { complete: true });
            const id = decoded.payload.id;
            const user = await Account.findById(id).lean();
            let packages = await Package.find({}).populate("productList")
            packages = utils.mapObjectInArray(packages);
            let view = req.query.view || "table"
            let switchView = view === "table" ? "card" : "table";
            res.render(`${path}/packageManagement`, {
                layout: "manager/main",
                tag: "package",
                packages,
                view,
                switchView,
                user
            });
        } catch (err) {
            console.log(err.message);
            res.render("error/500");
        }
    },

    getAddPackage: async (req, res) => {
        try {
            res.locals.hyperlinks = hyperlinksSidebarManager('package-management');
            res.locals.breadCrumb = pushBreadCrumb("Quản lý gói", '/manager/package-management');

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

            const productList = req.body.productList.split(", ").map(item => {
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

            const image = await utils.createUrlFromImageName(req.file, "packages");
            const newPackage = new Package({
                name: req.body.name,
                limitPerPerson: req.body.limitPerPerson,
                limitTime: req.body.limitTime,
                defaultPrice: req.body.defaultPrice,
                image,
                productList,
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
            res.locals.hyperlinks = hyperlinksSidebarManager('package-management');
            res.locals.breadCrumb = pushBreadCrumb("Quản lý gói", '/manager/package-management');

            const id = req.params.id;
            let package = await Package.findById(id);
            if (!package) {
                return res.render("error/404");
            }
            package = package.toObject();
            let productData = "";
            package.productList.forEach((item) => {
                productData += item.product + "-" + item.limitPerPackage + ", ";
            })
            productData = productData.slice(0, -2);
            package.productData = productData;

            let products = await Product.find({}).populate('category');
            products = utils.mapObjectInArray(products);

            // sort products with all product has id in package.productList first
            products = utils.sortProductByPackage(products, package.productList);

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

            const productList = req.body.productList.split(", ").map(item => {
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

            package.name = req.body.name;
            package.limitPerPerson = req.body.limitPerPerson;
            package.limitTime = req.body.limitTime;
            package.defaultPrice = req.body.defaultPrice;
            package.description = req.body.description || "";
            package.productList = productList;
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

            const order = await Order.findOne({ item: id, type: "Package" });
            if (order) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: 'Gói nhu yếu phẩm đang được sử dụng',
                    errorCode: "PACKAGE_USED"
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