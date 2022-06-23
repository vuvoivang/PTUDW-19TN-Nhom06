const hyperlinksSidebarUser = (userId) => [
    {
        label: "Tài khoản của tôi",
        href: `/user/${userId}/account`,
        icon: "fa-solid fa-circle-user fa-lg"
    },
    {
        label: "Lịch sử được quản lý",
        href: `/user/${userId}/managementHistory`,
        icon: "fa-solid fa-clock-rotate-left fa-lg"
    },
    {
        label: "Lịch sử mua hàng",
        href: `/user/${userId}/paymentHistory`,
        icon: "fa fa-cart-plus fa-lg"
    },
    {
        label: "Tài khoản thanh toán",
        href: `/user/${userId}/accountPayment`,
        icon: "fa-solid fa-user-plus fa-lg"
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

module.exports = {
    hyperlinksSidebarUser,
    userBreadCrumb,
    transactionType,
    MIN_DEPOSIT,
    PREFIX_STORAGE_FILE
}
