// const API_URL = "https://covid-19-management-sys-19tn.herokuapp.com/user";

function handleChangePassword(id) {
    console.log(id);
    const oldPassword = document.getElementById('oldPassword').value;
    const password = document.getElementById('newPassword').value;
    const passwordConfirm = document.getElementById('newPasswordConfirmation').value;

    if (oldPassword === "") {
        toastMessage("Vui lòng nhập mật khẩu cũ!");
        return;
    }
    if (password === "") {
        toastMessage("Vui lòng nhập mật khẩu mới!");
        return;
    }
    if (passwordConfirm === "") {
        toastMessage("Vui lòng xác nhận lại mật khẩu mới!");
        return;
    }
    if (password !== passwordConfirm)
        return document.getElementById('newPasswordError').innerHTML = "Mật khẩu không khớp!";
    else document.getElementById('newPasswordError').innerHTML = "";

    fetch(`${API_URL}/change-password`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ id, oldPassword: oldPassword, newPassword: password })
    }).then(resp => resp.json())
        .then(result => {
            const { status, message } = result;
            if (status === "success") {
                toastMessage(message, "success", true);
                return
            }
            else {
                toastMessage(message || "Đổi mật khẩu thất bại!","failed", false);
            }

        })
        .catch(err => toastMessage(err || "Có lỗi xảy ra, vui lòng thử lại", "failed",false))
}