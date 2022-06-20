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

module.exports = {
    hyperlinksSidebarUser,
    userBreadCrumb,
    hyperlinksSidebarAdmin,
    adminBreadCrumb
}