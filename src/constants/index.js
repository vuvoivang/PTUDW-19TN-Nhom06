const hyperlinksSidebarUser = (currentTab) => [
    {
        label: "Tài khoản của tôi",
        href: `/user/account`,
        icon: "fa-solid fa-circle-user fa-lg",
        isActive: "account" === currentTab
    },
    {
        label: "Lịch sử được quản lý",
        href: `/user/managementHistory`,
        icon: "fa-solid fa-clock-rotate-left fa-lg",
        isActive: "myManagementHistory" === currentTab
    },
    {
        label: "Lịch sử mua hàng",
        href: `/user/paymentHistory`,
        icon: "fa fa-cart-plus fa-lg",
        isActive: "myPaymentHistory" === currentTab
    },
    {
        label: "Tài khoản thanh toán",
        href: `/user/accountPayment`,
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

const hyperlinksSidebarAdmin = (currentTab) => [
    {
        label: "Quản lý tài khoản",
        href: "/admin/view",
        icon: "fa-solid fa-people-roof fa-lg",
        isActive: "view" === currentTab
    },
    {
        label: "Tạo tài khoản",
        href: "/admin/create",
        icon: "fa-solid fa-user-plus fa-lg",
        isActive: "create" === currentTab
    },
    {
        label: "Quản lý cơ sở",
        href: "/admin/place",
        icon: "fa-solid fa-list-check fa-lg",
        isActive: "place" === currentTab
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

const hyperlinksSidebarManager = (currentTab) => [
    {
        label: "Quản lý bệnh nhân",
        href: "/manager/patient-management",
        icon: "fa-solid fa-bed-pulse",
        isActive: "patient-management" === currentTab
    },
    {
        label: "Quản lý danh mục",
        href: "/manager/category-management",
        icon: "material-icons",
        isActive: "category-management" === currentTab
    },
    {
        label: "Quản lý nhu yếu phẩm",
        href: "/manager/product-management",
        icon: "fa-solid fa-cube",
        isActive: "product-management" === currentTab
    },
    {
        label: "Quản lý gói",
        href: "/manager/package-management",
        icon: "fa-solid fa-box",
        isActive: "package-management" === currentTab
    },
    {
        label: "Quản lý thanh toán",
        href: "/manager/payment-management",
        icon: "fa-solid fa-credit-card",
        isActive: "payment-management" === currentTab
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
