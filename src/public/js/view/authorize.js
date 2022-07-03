const { ggSignin, faceSignin } = require('../../../config/firebase.config');
const axios = require('axios');

var usernameInput = document.getElementById('username');
var ggBtn = document.getElementById('google');
var fBtn = document.getElementById('facebook');

function showToast(message) {
    document.getElementById("alertMessage").innerHTML = message;
    document.getElementById("alertMessage").style.color = "red";
    var x = document.getElementById("alertMessage");
    x.className = "show";
    setTimeout(() => {
        x.className = x.className.replace("show", "");
    }, 2000);
};

const sendAuthorizeRequest = async (username) => {
    const res = await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/authentication/authorize",
        data: {
            username
        }
    });

    if (res.data.page) {
        localStorage.username = username;
        location.href = res.data.page;
    }


};

function authorizeAccount() {
    let username = usernameInput.value;
    if (username == "") {
        showToast("Please fill the username");
    }
    else {
        sendAuthorizeRequest(username);
    }
};

ggBtn.addEventListener('click', (e) => {
    ggSignin()
});

fBtn.addEventListener('click', e => {
    faceSignin()
});

let form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    authorizeAccount();
});

