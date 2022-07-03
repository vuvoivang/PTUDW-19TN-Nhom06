
const API_URL = "http://localhost:3000"
const MIN_VALUE = 30000;

const handleUpdateMinimumTransfer = () => {
    const amount = document.getElementById('amountInput').value;

    if (amount <= MIN_VALUE) {
        toastInform(`Số tiền quy định ít nhất là ${MIN_VALUE} đồng!`);
        return;
    }

    fetch(`${API_URL}/banking/v1/update-minimum-transfer`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ amount })
    }).then(resp => resp.json())
        .then(result => {
            const { status, message } = result;
            if (status !== "success") {
                toastMessage(message, "failed");
                return
            }
            else {
                toastMessage(message || "Cập nhật thành công!", "success", true);
            }

        })
        .catch(err => toastMessage(message(err || "Có lỗi xảy ra, vui lòng thử lại")))
}

function handleUpdateDebt() {
    let ids = document.querySelectorAll('.userId');

    let data = [];
    for (let i = 0; i < ids.length; i++) {
        let body = {
            userId: parseInt(ids[i].value),
            displayName: document.getElementById(`displayName-${ids[i].value}`).innerText,
            state: document.getElementById(`state-${ids[i].value}`).innerText,
            debt: document.getElementById(`debt-${ids[i].value}`).innerText
        }
        checkbox = document.getElementById(`checkNotify-${ids[i].value}`);
        if (checkbox.checked == true) {
            data.push(body);
        }
    }
    fetch(`${API_URL}/api/v1/manager/debt/update`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ data })
    }).then(resp => resp.json())
        .then(res => {
            let { result } = res;
            if (result == "success") {
                location.reload();
            }
        })
        .catch(err => toastMessage(message(err || "Có lỗi xảy ra, vui lòng thử lại")))
}