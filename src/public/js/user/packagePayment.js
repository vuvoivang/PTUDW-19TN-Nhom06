
const userInputs = Array.from(document.getElementsByClassName('amount-input-product'));
function checkEveryNumberValid(){
    let isValid = true;
    userInputs.forEach(
        userInput =>
            {
                if(Number(userInput.value) < 1){
                    document.getElementById("buttonOrder").disabled = true;
                    isValid = false;
                }
            }
    )
    if(isValid){
        document.getElementById("buttonOrder").disabled = false;
    }
}
function updateTotalPriceOrder(){
    const productTotalPrice = Array.from(document.getElementsByClassName('product-total-price'));
    let total = 0;
    
    productTotalPrice.forEach(ele => total += Number(ele.innerText))
    
    document.getElementById('package-total-price').innerHTML = total;
}
function handleChangeNumber(id, value){
    if(Number(value) < 1){
        document.getElementById(`number-validate-${id}`).style.display = 'block';
        document.getElementById("buttonOrder").disabled = true;
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

userInputs.forEach(
    userInput =>
        userInput.addEventListener('change',
            (event) => {
                const { value, id } = event.target;
                handleChangeNumber(id, value);
            }
        )
)
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
    if(Number(inputPackageNum.value) > 1){
        inputPackageNum.value = Number(inputPackageNum.value) - 1;
    } else{
        toastMessage("Không thể giảm số lượng package hơn nữa", "failed");
    }
}