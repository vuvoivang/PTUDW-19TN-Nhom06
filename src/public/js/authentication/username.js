let username = "";
if(localStorage.getItem('username')) {
    username = localStorage.getItem('username');
}
var usernameInput = document.getElementById('username');
usernameInput.value = username;
localStorage.removeItem('username');