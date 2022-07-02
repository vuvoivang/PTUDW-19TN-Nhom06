const toastMessage = (message, type = "success", isReload = false) => {
    Toastify({
        text: message,
        duration: 2000,
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

module.exports = {
    toastMessage
}