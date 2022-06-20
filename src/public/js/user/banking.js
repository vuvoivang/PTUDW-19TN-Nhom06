
const API_URL = "http://localhost:3000/banking"

const handleBankingConnect = (id) => {
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirmation').value;

    if (password === "") {
        alert("Please input the password field");
        return;
    }
    if (password !== passwordConfirm)
        return document.getElementById('registerPasswordError').innerHTML = "Passwords must match.";
    else document.getElementById('registerPasswordError').innerHTML = "";

    fetch(`${API_URL}/v1/account-payment`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ id, newPassword: password })
    }).then(resp => resp.json())
        .then(result => {
            const { status, message, data } = result;
            if (status !== "success") {
                alert(message);
                location.reload();
                return
            }
            else {
                alert("Create new account payment successfully!!");
                location.reload();
            }

        })
        .catch(err => console.log(err))
}


const handleDeposit = (id) => {
    const amount = document.getElementById('amountInput').value;

    if (amount <= 1000) {
        alert("The amount must be at least 1000 dong");
        return;
    }

    fetch(`${API_URL}/v1/deposit`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ id, amount })
    }).then(resp => resp.json())
        .then(result => {
            const { status, message, data } = result;
            if (status !== "success") {
                alert(message);
                location.reload();
                return
            }
            else {
                alert("Deposit successfully!!");
                location.reload();
            }

        })
        .catch(err => console.log(err))
}