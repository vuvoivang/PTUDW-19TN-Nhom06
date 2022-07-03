const API_URL = "http://localhost:3000";

const handleAddPatient = async () => {
    const body = getFormInput("add");
    const res = await fetch(`${API_URL}/manager/patient-management`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: body
    });
    const data = await res.json();
    if (data.status === "success") {
        toastMessage(data.message, "success", true);
    } else {
        toastMessage(data.message || "Có lỗi xảy ra, vui lòng thử lại", "error");
    }
}

const handleUpdatePatient = async () => {
    const id = document.querySelector("#form-update-patient #registerId").value;
    const body = getFormInput("update");
    const res = await fetch(`${API_URL}/manager/patient-management/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "PUT",
        body: body
    });
    const data = await res.json();
    if (data.status === "success") {
        toastMessage(data.message, "success");
    } else {
        toastMessage(data.message || "Có lỗi xảy ra, vui lòng thử lại", "error");
    }
}

const getFormInput = (type) => {
    const username = document.querySelector(`#form-${type}-patient #registerUsername`).value;
    const password = document.querySelector(`#form-${type}-patient #registerPassword`).value;
    const displayName = document.querySelector(`#form-${type}-patient #registerName`).value;
    const cardID = document.querySelector(`#form-${type}-patient #registerCardID`).value;
    const dateOfBirth = document.querySelector(`#form-${type}-patient #registerDOB`).value;
    const state = document.querySelector(`#form-${type}-patient #registerState`).value;
    const province = document.querySelector(`#form-${type}-patient #registerProvince`).value;
    const district = document.querySelector(`#form-${type}-patient #registerDistrict`).value;
    const ward = document.querySelector(`#form-${type}-patient #registerWard`).value;
    const quarantineLocation = document.querySelector(`#form-${type}-patient #registerQuarantine`).value;
    const relates = document.querySelector(`#form-${type}-patient #registerRelates`).value;

    // body json data
    const data = {
        username,
        password,
        displayName,
        cardID,
        dateOfBirth,
        state,
        province,
        district,
        ward,
        quarantineLocation,
        relates
    };

    return JSON.stringify(data);
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
                isRedirect ? window.location.href = "/manager/patient-management" : window.location.reload();
            }

        }
    }).showToast();
}