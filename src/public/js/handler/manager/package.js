const API_URL = "https://covid-19-management-sys-19tn.herokuapp.com";

const handleAddPackage = async () => {
    const formData = getFormInput("add");
    const res = await fetch(`${API_URL}/manager/package-management`, {
        method: "POST",
        body: formData
    });
    const data = await res.json();
    if (data.status === "success") {
        toastMessage(data.message, "success", true);
    } else {
        toastMessage(data.message || "Có lỗi xảy ra, vui lòng thử lại", "error");
    }
}

const handleUpdatePackage = async () => {
    const id = document.querySelector("#form-update-package #registerId").value;
    const formData = getFormInput("update");

    const res = await fetch(`${API_URL}/manager/package-management/${id}`, {
        method: "PUT",
        body: formData
    });
    const data = await res.json();
    if (data.status === "success") {
        toastMessage(data.message, "success");
    } else {
        toastMessage(data.message || "Có lỗi xảy ra, vui lòng thử lại", "error");
    }
}

const handleDeletePackage = async () => {
    const id = document.querySelector("#form-delete-package #package-id").value;
    const res = await fetch(`${API_URL}/manager/package-management/${id}`, {
        method: "DELETE"
    });
    const data = await res.json();
    if (data.status === "success") {
        toastMessage(data.message, "success");
    } else {
        toastMessage(data.message || "Có lỗi xảy ra, vui lòng thử lại", "error");
    }
}

const getFormInput = (type) => {
    const name = document.querySelector(`#form-${type}-package #registerName`).value;
    const limitPerPerson = document.querySelector(`#form-${type}-package #registerLimitPerPerson`).value;
    const limitTime = document.querySelector(`#form-${type}-package #registerLimitTime`).value;
    const productList = document.querySelector(`#form-${type}-package #registerProductList`).value;
    const description = document.querySelector(`#form-${type}-package #registerDescription`).value;
    const imageInput = document.querySelector(`#form-${type}-package #registerImage`);
    let defaultPrice = document.querySelector(`#form-${type}-package #registerPrice`).innerHTML || 0;
    defaultPrice = parseNumber(defaultPrice);
    const image = imageInput.files.length > 0 ? imageInput.files[0] : null;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("limitPerPerson", limitPerPerson);
    formData.append("limitTime", limitTime);
    formData.append("productList", productList);
    formData.append("defaultPrice", defaultPrice);
    if (image) {
        formData.append("image", image);
    }
    if (description) {
        formData.append("description", description);
    }

    return formData;
}

// utils
const toastMessage = (message, type = "success", isRedirect = false) => {
    Toastify({
        text: message,
        duration: 1000,
        gravity: "top",
        stopOnFocus: true,
        position: "right",
        style: {
            background: type === "success" ? "#4CAF50" : "#F44335",
        },
        callback: function () {
            if (type == "success") {
                isRedirect ? window.location.href = "/manager/package-management" : window.location.reload();
            }

        }
    }).showToast();
}