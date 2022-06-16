const hyperlinksSidebarUser = [
    {
        label: "Tài khoản của tôi",
        href: "#",
        icon: "fa-solid fa-circle-user fa-lg"
    },
    {
        label: "Lịch sử được quản lý",
        href: "#",
        icon: "fa-solid fa-clock-rotate-left fa-lg"
    },
    {
        label: "Lịch sử mua hàng",
        href: "#",
        icon: "fa fa-cart-plus fa-lg"
    },
    {
        label: "Tài khoản thanh toán",
        href: "/user/123/accountPayment",
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
module.exports = {
    hyperlinksSidebarUser,
    userBreadCrumb,
    transactionType
}
