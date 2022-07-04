// const API_URL = "https://covid-19-management-sys-19tn.herokuapp.com";

function showToast(message, color) {
    document.getElementById("snackbar").innerHTML = message;
    document.getElementById("snackbar").style.color = color;
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(() => {
        x.className = x.className.replace("show", "");
    }, 3000);
}

const getPermission = (managerUsername) => {
    fetch(`${API_URL}/api/v1/manager/permission/get`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ managerUsername })
    }).then(resp => resp.json())
        .then(res => {
            let { permissions } = res;
            if (permissions) {
                updateCheckbox(permissions, managerUsername);
            }
        });
};

const updatePermission = (managerUsername, changeData) => {
    fetch(`${API_URL}/api/v1/manager/permission/update`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            managerUsername,
            permissions: changeData
        })
    }).then(resp => resp.json())
    .then(res => {
        if (res.result === 'success') {
            showToast('Cập nhật quyền cho quan lý thành công', "#008000");
        }
        else {
            showToast('Cập nhật quyền cho quản lý thất bại', "red");
        }
    })
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

const showHistory = (managerUsername) => {
    fetch(`${API_URL}/api/v1/manager/log`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ managerUsername })
    });
};

// const updateState = (managerUsername, state) => {
//     fetch(`${API_URL}/api/v1/manager/update`, {
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         method: "POST",
//         body: JSON.stringify({
//             managerUsername,
//             role: `${state}_manager`
//         })
//     });
// }

const updateCheckbox = (permissions, username) => {
    for (let i = 0; i < permissions.length; i++) {
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
}

function historyView(username) {
    showHistory(username);
}

// function stateUpdate(username) {
//     let state = document.getElementById(`state-${username}`).innerText;
//     if (state === 'active') {
//         document.getElementById(`state-${username}`).innerText = 'inactive';
//         document.getElementsByClassName
//     }
// }

