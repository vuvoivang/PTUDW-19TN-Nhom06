const axios = require('axios');
var btn = document.getElementById('signout');

const sendSignOutRequest = async () => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/authentication/signout'
        })
        if (res.data.page) {
            window.location.href = res.data.page
        }
    } catch (error) {
        alert(error)
    }
}

btn.addEventListener('click', () => {
    sendSignOutRequest();
});