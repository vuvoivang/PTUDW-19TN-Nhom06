const handleAddCategory = async () => {
    const name = document.querySelector("#form-add-category #category-name").value;
    const image = document.querySelector("#form-add-category #category-image").files[0];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    const res = await fetch(`${API_URL}/manager/category-management`, {
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

const handleUpdateCategory = async () => {
    const id = document.querySelector("#form-update-category #category-id").value;
    const name = document.querySelector("#form-update-category #category-name").value;
    const imageInput = document.querySelector("#form-update-category #category-image");
    const image = imageInput.files.length > 0 ? imageInput.files[0] : null;

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
        formData.append("image", image);
    }
    const res = await fetch(`${API_URL}/manager/category-management/${id}`, {
        method: "PUT",
        body: formData
    });
    const data = await res.json();
    if (data.status === "success") {
        toastMessage(data.message, "success", true);
    } else {
        toastMessage(data.message || "Có lỗi xảy ra, vui lòng thử lại", "error");
    }
}

const handleDeleteCategory = async () => {
    const id = document.querySelector("#form-delete-category #category-id").value;
    const res = await fetch(`${API_URL}/manager/category-management/${id}`, {
        method: "DELETE"
    });
    const data = await res.json();
    if (data.status === "success") {
        toastMessage(data.message, "success", true);
    } else {
        toastMessage(data.message || "Có lỗi xảy ra, vui lòng thử lại", "error");
    }
}

// utils
const toastMessage = (message, type = "success", isReload = false) => {
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
            isReload && window.location.reload();
        }
    }).showToast();
}