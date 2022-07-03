const API_URL = 'http://localhost:3000';

const userInputs = Array.from(document.getElementsByClassName('amount-input-product'));
const submitOrder = async (package) => {
    let formData = package;
    let address = document.getElementById('address-order').value;
    let phone = document.getElementById('phone-number-order').value;
    if (address === "") {
        toastMessage(
            `Địa chỉ không được để trống`,
            'failed'
        );
        return;
    }
    if (phone === "") {
        toastMessage(
            `Số điện thoại không được để trống`,
            'failed'
        );
        return;
    }
    let inputPackageNum = document.getElementById(`package-number`).value;
    inputPackageNum = Number(inputPackageNum);
    if (inputPackageNum < 1) {
        toastMessage('Số lượng package phải lớn hơn 0', 'failed');
        return;
    }
    for (let i = 0; i < package.productList.length; i++) {
        let productId = package.productList[i].product._id;
        let productNumber = document.getElementById(`product-${productId}`).value;
        productNumber = Number(productNumber);
        let maxNumThisProduct = package.productList[i].limitPerPackage;
        if (productNumber > maxNumThisProduct) {
            toastMessage(
                `Số lượng sản phẩm của ${package.productList[i].product.name} không được vượt quá ${maxNumThisProduct} theo quy định`,
                'failed'
            );
            return;
        }
        formData.productList[i].quantity = productNumber;
        formData.productList[i].totalAmount = Number(
            document.getElementById(`total-price-product-${productId}`).innerText
        );
    }
    formData.address = address;
    formData.phone = phone;
    formData.packageQuantity = inputPackageNum;
    formData.totalAmount = Number(document.getElementById('package-total-price').innerText) * inputPackageNum;
    formData.paymentMethod = document.getElementById('paymentMethodSelect').value;

    if(formData.paymentMethod === "credit-card"){
        const password = document.getElementById(`pass-account-payment`).value;
        if(!password){
            toastMessage(
                `Mật khẩu tài khoản thanh toán không được để trống`,
                'failed'
            );
            return;
        } else formData.passwordAccountPayment = password;
    }
    console.log(formData);
    // fetch api here
    res = await fetch(`${API_URL}/order`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.status == 'success') {
        toastMessage('Đặt hàng thành công', 'success');
        setTimeout(() => {
            let confirmModal = new bootstrap.Modal(document.getElementById('confirm'));
            confirmModal.show();
        }, 500);
    } else {
        toastMessage(data.message, 'failed');
    }
};
function checkEveryNumberValid() {
    let isValid = true;
    userInputs.forEach((userInput) => {
        if (Number(userInput.value) < 1) {
            document.getElementById('buttonOrder').disabled = true;
            isValid = false;
        }
    });
    if (isValid) {
        document.getElementById('buttonOrder').disabled = false;
    }
}
function updateTotalPriceOrder() {
    const productTotalPrice = Array.from(document.getElementsByClassName('product-total-price'));
    let total = 0;

    productTotalPrice.forEach((ele) => (total += Number(ele.innerText)));

    document.getElementById('package-total-price').innerHTML = total;
}
function handleChangeNumber(id, value) {
    if (Number(value) < 1) {
        document.getElementById(`number-validate-${id}`).style.display = 'block';
        document.getElementById('buttonOrder').disabled = true;
        return;
    } else {
        document.getElementById(`number-validate-${id}`).style.display = 'none';
        checkEveryNumberValid();
    }
    let price = document.getElementById(`price-${id}`).innerText;
    price = Number(value) * Number(price);
    document.getElementById(`total-price-${id}`).innerHTML = price;
    updateTotalPriceOrder();
}

userInputs.forEach((userInput) =>
    userInput.addEventListener('change', (event) => {
        const { value, id } = event.target;
        handleChangeNumber(id, value);
    })
);
function increaseNumber(id) {
    let inputPackageNum = document.querySelector(`#product-${id}.amount-input-product`);
    let newValue = Number(inputPackageNum.value) + 1;
    inputPackageNum.value = newValue;
    handleChangeNumber(`product-${id}`, newValue);
}
function decreaseNumber(id) {
    let inputPackageNum = document.querySelector(`#product-${id}.amount-input-product`);

    let newValue = Number(inputPackageNum.value) - 1;
    inputPackageNum.value = newValue;
    handleChangeNumber(`product-${id}`, newValue);
}
function increaseNumberPackage() {
    let inputPackageNum = document.getElementById(`package-number`);
    inputPackageNum.value = Number(inputPackageNum.value) + 1;
}
function decreaseNumberPackage() {
    let inputPackageNum = document.getElementById(`package-number`);
    if (Number(inputPackageNum.value) > 1) {
        inputPackageNum.value = Number(inputPackageNum.value) - 1;
    } else {
        toastMessage('Không thể giảm số lượng package hơn nữa', 'failed');
    }
}

document.getElementById("paymentMethodSelect").addEventListener("change", function () {
    if(this.value === "credit-card"){
        document.getElementById(`form-password-account-payment`).style.visibility = 'visible';
    } else{
        document.getElementById(`form-password-account-payment`).style.visibility = 'hidden';
    }
})