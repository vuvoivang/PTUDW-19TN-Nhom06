function signout() {
    const res = axios({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/authentication/signout'
    });
    location.href = '/';
}