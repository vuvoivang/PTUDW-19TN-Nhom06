const { ggSignin, faceSignin } = require('../../../config/firebase.config');
const axios = require('axios')

var usernameInput = document.getElementById('username')
var passinput = document.getElementById('password')
var submitBtn = document.getElementById('submit')
var ggBtn = document.getElementById('google')
var fBtn = document.getElementById('facebook')
// var backBtn = document.getElementsByClassName('direction')
var form = document.querySelector('form')


form.addEventListener('change', (e) => {
    let username = usernameInput.value
    let pass = passinput.value

    if (username != '' && pass != '') {
        submitBtn.disabled = false
        console.log('Now you can click')
    }
})

const sendFormRequest = async (username, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/authentication/signin',
            data: {
                username, password
            }
        });
        if (res.data.page) {
            window.location.href = res.data.page
        }
    } catch (error) {
        alert(error)
    }
}

form.addEventListener('submit', (e) => {
    let username = usernameInput.value
    let password = passinput.value

    sendFormRequest(username, password)
})



ggBtn.addEventListener('click', (e) => {
    ggSignin()
})

fBtn.addEventListener('click', e => {
    faceSignin()
})

