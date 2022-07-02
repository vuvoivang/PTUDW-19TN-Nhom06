var signout = document.getElementById('signout');

signout.addEventListener('click', async () => {
    const res = await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/authentication/signout'
    });
    if(res.data.page) {
        location.href = res.data.page;
    }
})