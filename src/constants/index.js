const hyperlinksSidebarUser = (userId, currentTab) => [
    {
        label: "Tài khoản của tôi",
        href: `/user/${userId}/account`,
        icon: "fa-solid fa-circle-user fa-lg",
        isActive: "account" === currentTab
    },
    {
        label: "Lịch sử được quản lý",
        href: `/user/${userId}/managementHistory`,
        icon: "fa-solid fa-clock-rotate-left fa-lg",
        isActive: "myManagementHistory" === currentTab
    },
    {
        label: "Lịch sử mua hàng",
        href: `/user/${userId}/paymentHistory`,
        icon: "fa fa-cart-plus fa-l g",
        isActive: "myPaymentHistory" === currentTab
    },
    {
        label: "Tài khoản thanh toán",
        href: `/user/${userId}/accountPayment`,
        icon: "fa-solid fa-user-plus fa-lg",
        isActive: "accountPayment" === currentTab
    }
];
const userBreadCrumb = {
    path: [
        {
            label: "Người dùng",
            link: "/user"
        }
    ],
    mainLabel: "Người dùng"
}
const transactionType = {
    deposit: "deposit",
    withdraw: "withdraw",
    payment: "payment"
}
const MIN_DEPOSIT = 1000;

const PREFIX_STORAGE_FILE = {
    "categories": "category",
    "products": "product",
    "packages": "package"
}

const hyperlinksSidebarAdmin = [
    {
        label: "Quản lý tài khoản",
        href: "/admin/view",
        icon: "fa-solid fa-people-roof fa-lg",
        style: ''
    },
    {
        label: "Tạo tài khoản",
        href: "/admin/create",
        icon: "fa-solid fa-user-plus fa-lg",
        style: ''
    },
    {
        label: "Quản lý cơ sở",
        href: "/admin/place",
        icon: "fa-solid fa-list-check fa-lg",
        style: ''
    }
];

const adminBreadCrumb = {
    path: [
        {
            label: "Quản trị viên",
            link: "/admin"
        }
    ],
    mainLabel: "Quản trị viên"
}

const hyperlinksSidebarManager = [
    {
        label: "Quản lý bệnh nhân",
        href: "/manager/patient-management",
        icon: "fa-solid fa-bed-pulse",
        style: ''
    },
    {
        label: "Quản lý danh mục",
        href: "/manager/category-management",
        icon: "material-icons",
        style: ''
    },
    {
        label: "Quản lý nhu yếu phẩm",
        href: "/manager/product-management",
        icon: "fa-solid fa-cube",
        style: ''
    },
    {
        label: "Quản lý gói",
        href: "/manager/package-management",
        icon: "fa-solid fa-box",
        style: ''
    },
    {
        label: "Quản lý thanh toán",
        href: "/manager/payment-management",
        icon: "fa-solid fa-credit-card",
        style: ''
    }
];

const managerBreadCrumb = {
    path: [
        {
            label: "Quản lý",
            link: "/manager"
        }
    ],
    mainLabel: "Quản lý"
}



module.exports = {
    hyperlinksSidebarUser,
    userBreadCrumb,
    transactionType,
    MIN_DEPOSIT,
    PREFIX_STORAGE_FILE,
    hyperlinksSidebarAdmin,
    adminBreadCrumb,
    hyperlinksSidebarManager,
    managerBreadCrumb
}
