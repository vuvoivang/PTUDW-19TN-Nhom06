
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
            const { status, message } = result;
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
        alert("Số tiền nạp ít nhất là 5000 đồng!");
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
                Toastify({
                    text: "Nạp tiền thành công!",
                    duration: 3000,
                    gravity: "top", // `top` or `bottom`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    position: "right",
                    style: {
                        background: "#00b09b",
                    },
                    callback: function () { location.reload(); }
                }).showToast();

            }

        })
        .catch(err => console.log(err))
}