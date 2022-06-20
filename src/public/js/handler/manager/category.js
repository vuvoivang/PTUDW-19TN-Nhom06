const ROOT_API = "http://localhost:3000/manager";

// utils
const toastMessage = (message, type = "success", isReload = false) => {
    Toastify({
        text: message,
        duration: 2500,
        gravity: "top",
        stopOnFocus: true,
        position: "right",
        style: {
            background: type === "success" ? "#4CAF50" : "#F44335",
        },
        callback: function () { if (isReload) location.reload(); }
    }).showToast();
}

const handleAddCategory = async () => {
    const name = document.querySelector("#form-add-category #category-name").value;
    const image = document.querySelector("#form-add-category #category-image").files[0];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    for (const value of formData.values()) {
        console.log(value);
    }
    const res = await fetch(`${ROOT_API}/category-management`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data; boundary=MyBoundary'
        },
        method: "POST",
        body: formData
    });
    const data = await res.json();
    console.log("data", data);
    if (data.status === "success") {
        toastMessage(data.message, "success", true);
        setTimeout(() => window.location.reload(), 1000);
    } else {
        toastMessage(data.message || "Có lỗi xảy ra, vui lòng thử lại", "error");
    }
}