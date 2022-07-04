const API_URL = 'https://covid-19-management-sys-19tn.herokuapp.com//banking';
const MIN_DEPOSIT = 1000;
function toastInform(message, isReload = false) {
    Toastify({
        text: message,
        duration: 2500,
        gravity: 'top', // `top` or `bottom`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        position: 'right',
        style: {
            background: '#00b09b',
        },
        callback: function () {
            if (isReload) location.reload();
        },
    }).showToast();
}

const handleBankingConnect = (id) => {
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirmation').value;

    if (password === '') {
        toastInform('Vui lòng nhập mật khẩu!');
        return;
    }
    if (password !== passwordConfirm)
        return (document.getElementById('registerPasswordError').innerHTML = 'Mật khẩu không khớp!');
    else document.getElementById('registerPasswordError').innerHTML = '';

    fetch(`${API_URL}/v1/account-payment`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ id, newPassword: password }),
    })
        .then((resp) => resp.json())
        .then((result) => {
            const { status, message } = result;
            if (status !== 'success') {
                toastInform(message);
                return;
            } else {
                toastInform(message || 'Liên kết tài khoản thanh toán thành công!', true);
            }
        })
        .catch((err) => toastInform(err || 'Có lỗi xảy ra, vui lòng thử lại', true));
};

const handleDeposit = (id, pay = false) => {
    const type = pay ? '2' : '1';
    const amount = document.getElementById(`amountInput${type}`).value;

    if (amount <= MIN_DEPOSIT) {
        toastInform(`Số tiền nạp ít nhất là ${MIN_DEPOSIT} đồng!`);
        return;
    }

    fetch(`${API_URL}/v1/exchange`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ id, amount, pay }),
    })
        .then((resp) => resp.json())
        .then((result) => {
            const { status, message } = result;
            if (status !== 'success') {
                toastInform(message);
                return;
            } else {
                toastInform(message, true);
            }
        })
        .catch((err) => toastInform(err || 'Có lỗi xảy ra, vui lòng thử lại'));
};
