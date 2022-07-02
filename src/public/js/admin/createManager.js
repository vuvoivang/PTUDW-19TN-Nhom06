var username = document.getElementById('username');
var pass1 = document.getElementById('password');
var pass2 = document.getElementById('confirm-password');
var button = document.getElementById("create-account");
var form = document.getElementById("create-form");
var checkAll = document.getElementById("p8");
var update = document.getElementById("update");
var cancel = document.getElementById("cancel");

form.addEventListener("change", () => {
    if (username.value != "" && pass1.value != "" && pass1.value === pass2.value) {
        button.disabled = false;
    }
    else {
        button.disabled = true;
    }
});

checkAll.addEventListener("change", () => {
    if (checkAll.checked == true) {
        let permissions = document.querySelectorAll(".form-check-input.float-end");
        permissions.forEach(element => {
            element.checked = true;
        });
    }
    else {
        let permissions = document.querySelectorAll(".form-check-input.float-end");
        permissions.forEach(element => {
            element.checked = false;
        });
    }
});

function showToast() {
    document.getElementById("snackbar").innerHTML = "Thêm tài khoản quản lý thành công";
    document.getElementById("snackbar").style.color = "#008000";
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(() => {
        x.className = x.className.replace("show", "");
    }, 3000);
}



update.addEventListener("click", () => {
    sendCreateForm();
    showToast();
});

const sendCreateForm = async () => {
    let checkbox = document.querySelectorAll(".form-check-input.float-end");
    let permissions = [];
    checkbox.forEach(element => {
        if (element.checked == true && element.value !== 'all')
            permissions.push(element.value);
    });

    const res = await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/manager/create",
        data: {
            username: username.value,
            password: password.value,
            permissions
        }
    });
}