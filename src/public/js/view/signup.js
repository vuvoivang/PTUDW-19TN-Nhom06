const { ggSignup, faceSignup } = require('../../../config/firebase.config');
const axios = require('axios')

var emailInput = document.getElementById('email')
var usernameInput = document.getElementById('username')
var passinput = document.getElementById('password')
var cpassInput = document.getElementById('confirm-password')
var submitBtn = document.getElementById('submit')
var termCheck = document.getElementById('terms-confirm')
var ggBtn = document.getElementById('google')
var fBtn = document.getElementById('facebook')
// var backBtn = document.getElementsByClassName('direction')
var form = document.querySelector('form')


form.addEventListener('change', (e) => {
    let email = emailInput.value
    let username = usernameInput.value
    let pass1 = passinput.value
    let pass2 = cpassInput.value

    if (email != '' && username != '' && pass1 != '' && pass2 != '') {
        if (pass1 !== pass2) {
            console.log('Please provide correct confirm password')

        }
        else {
            if (termCheck.checked) {
                submitBtn.disabled = false
                console.log('Now you can click')
            }
        }
    }
})

const sendFormRequest = async (email, username, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/authentication/signup',
            data: {
                email, username, password
            }
        })
        if (res.data.page) {
            window.location.href = res.data.page
        }
    } catch (error) {
        alert(error)
    }
}

form.addEventListener('submit', (e) => {
    let email = emailInput.value
    let username = usernameInput.value
    let password = passinput.value

    sendFormRequest(email, username, password)
})



ggBtn.addEventListener('click', (e) => {
    ggSignup()
})

fBtn.addEventListener('click', e => {
    faceSignup()
})

