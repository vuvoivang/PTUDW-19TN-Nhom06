const { ggSignin, faceSignin } = require('../../../config/firebase.config');
const API_URL = 'http://localhost:3000';

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

const sendAuthorizeRequest = (username) => {
    if (!username) {
        showToast("Username is empty");
    }
    else {
        fetch(`${API_URL}/api/v1/authentication/authorize`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ username })
        }).then(resp => resp.json())
            .then(res => {
                const { result } = res;
                if (result === "success") {
                    localStorage.username = username;
                    location.href = res.page;
                }
                else {
                    showToast("Username or password is incorrect!!!");
                }
            });
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
    ggSignin();
});

fBtn.addEventListener('click', e => {
    faceSignin();
});

let form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    authorizeAccount();
});

