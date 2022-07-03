
const API_URL = "http://localhost:3000/banking"
const MIN_VALUE = 30000;

const handleUpdateMinimumTransfer = () => {
    const amount = document.getElementById('amountInput').value;

    if (amount <= MIN_VALUE) {
        toastInform(`Số tiền quy định ít nhất là ${MIN_VALUE} đồng!`);
        return;
    }

    fetch(`${API_URL}/v1/update-minimum-transfer`, {
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
                toastMessage(message || "Cập nhật thành công!","success", true);
            }

        })
        .catch(err => toastMessage(message(err || "Có lỗi xảy ra, vui lòng thử lại")))
}