
var username = document.getElementById('username');
var pass1 = document.getElementById('password');
var pass2 = document.getElementById('confirm-password');
var button = document.getElementById("create-account");
var form = document.getElementById("create-form");
var checkAll = document.getElementById("p8");
var update = document.getElementById("update");
var cancel = document.getElementById("cancel");

function showToast(message, color) {
    document.getElementById("snackbar").innerHTML = message;
    document.getElementById("snackbar").style.color = color;
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(() => {
        x.className = x.className.replace("show", "");
    }, 3000);
}

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

update.addEventListener("click", () => {
    sendCreateForm();
});

const sendCreateForm = () => {
    let checkbox = document.querySelectorAll(".form-check-input.float-end");
    let permissions = [];
    checkbox.forEach(element => {
        if (element.checked == true && element.value !== 'all')
            permissions.push(element.value);
    });
    fetch(`${API_URL}/api/v1/manager/create`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            username: username.value,
            password: password.value,
            permissions
        })
    }).then(resp => resp.json())
    .then(res => {
        if (res.result === 'success') {
            showToast("Thêm tài khoản quản lý thành công", "#008000");
        }
        else {
            showToast("Thêm tài khoản quản lý thất bại", "red");
        }
    })
}