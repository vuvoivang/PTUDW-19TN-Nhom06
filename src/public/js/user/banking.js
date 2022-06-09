// local
// const URL = "https://localhost:5000";

// deployment
const URL = "localhost:3001";


const handleBankingConnect = (id) => {
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirmation').value;

    if (password === "") {
        alert("Vui lòng nhập mật khẩu");
        return;
    }

    if (password !== passwordConfirm)
        return document.getElementById('registerPasswordError').innerHTML = "Mật khẩu không khớp.";
    else document.getElementById('registerPasswordError').innerHTML = "";

    fetch(`${URL}/auth/create-password`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ id: userID, newPassword: password })
    }).then(res => res.json())
        .then(data => {
            const { status, msg } = data;
            if (status != 200) {
                alert(msg);
                location.reload();
                return
            }
            location.reload();
        })
        .catch(err => console.log(err))

}

const handleBankingLogin = async () => {
    const password = document.getElementById('password').value;

    let bankingToken = null;

    await fetch(`${URL}/auth/login`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ id: userID, password: password })
    }).then(res => res.json())
        .then(data => {
            const { status, msg, token } = data;
            console.log(token);

            if (status != 200) {
                alert(msg);
                location.reload()
                return null
            }
            else
                return bankingToken = token;
        })
        .catch(err => console.log(err))

    console.log(bankingToken);

    fetch(`/user/${userID}/set-token`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ token: bankingToken })
    })
        .then(dummy => {
            location.reload();
        })
}

const handleDeposit = (e) => {
    e.preventDefault();
    console.log(e);
} 