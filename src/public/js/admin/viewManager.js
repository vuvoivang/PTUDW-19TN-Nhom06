
var search = document.getElementsByClassName('search-input');
var permissionBtn = document.getElementsByClassName('permission');
var stateBtn = document.getElementsByClassName('state');
var historyBtn = document.getElementsByClassName('history');
var usernameIn = document.getElementsByClassName('username');
var updateBtn = document.getElementById('update');


function showToast() {
    document.getElementById("snackbar").innerHTML = "Thêm tài khoản quản lý thành công";
    document.getElementById("snackbar").style.color = "#008000";
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(() => {
        x.className = x.className.replace("show", "");
    }, 3000);
}

const getPermission = async (managerUsername) => {
    const res = await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/manager/permission/get",
        data: {
            managerUsername
        }
    });
    if (res.data.permissions) {
        updateCheckbox(res.data.permissions, managerUsername);
    }
};

const updatePermission = async (managerUsername, changeData) => {
    const res = await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/manager/permission/update",
        data: {
            managerUsername,
            permissions: changeData
        }
    });
};

const showState = () => {
    let stateColor = document.getElementById('state-color');
    if (stateColor.innerText == 'active') {
        stateColor.setAttribute('color', "green");
    }
    else {
        stateColor.setAttribute('color', 'red');
    }
};

const showHistory = async (managerUsername) => {
    const res = await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/manager/log",
        data: {
            managerUsername
        }
    });
};

const updateState = async (state) => {
    const res = await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/manager/update",
        data: {
            managerUsername,
            role: `${state}_manager`
        }
    });
}

const updateCheckbox = async (permissions, username) => {
    for (let i = 0; i<permissions.length; i++) {
        document.getElementById(`p${permissions[i]}-${username}`).checked = true;
    }
};

function permissionView(username) {
    getPermission(username);
}

const getCheckedElement = (username) => {
    console.log(username);
    let checkbox = document.querySelectorAll(`.form-check-input.float-end.${username}`);
    let permissions = [];
    checkbox.forEach(element => {
        if (element.checked == true && element.value !== 'all')
            permissions.push(element.value);
    });
    return permissions;
}

function permissionUpdate(username) {
    console.log(username);
    updatePermission(username, getCheckedElement(username));
    showToast();
}

function historyView(username) {
    showHistory(username);
}


