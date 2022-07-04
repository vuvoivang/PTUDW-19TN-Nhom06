const axios = require('axios');
const { ggSignin, faceSignin } = require('../../../config/firebase.config');

var ggBtn = document.getElementById('google');
var fBtn = document.getElementById('facebook');

function showToast(message) {
    document.getElementById('alertMessage').innerHTML = message;
    document.getElementById('alertMessage').style.color = 'red';
    var x = document.getElementById('alertMessage');
    x.className = 'show';
    setTimeout(() => {
        x.className = x.className.replace('show', '');
    }, 2000);
}

const signInRequest = async (username, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'https://covid-19-management-sys-19tn.herokuapp.com//api/v1/authentication/signin',
            data: {
                username,
                password,
            },
        });
        if (res.data.page) {
            location.href = res.data.page;
        } else if (res.data.result == 'failed') {
            showToast('Username or password is incorrect!!!');
        }
    } catch (error) {
        alert(error);
    }
};

function signin() {
    let username = usernameInput.value;
    let password = document.getElementById('password').value;
    signInRequest(username, password);
}

ggBtn.addEventListener('click', (e) => {
    ggSignin();
});

fBtn.addEventListener('click', (e) => {
    faceSignin();
});

let form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    signin();
});
