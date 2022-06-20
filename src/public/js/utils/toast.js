const toastMessage = (message, success = true, isReload = false) => {
    Toastify({
        text: message,
        duration: 2500,
        gravity: "top", // `top` or `bottom`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        position: "right",
        style: {
            background: success ? "#4CAF50" : "#F44335",
        },
        callback: function () { if (isReload) location.reload(); }
    }).showToast();
}

module.exports = {
    toastMessage
}