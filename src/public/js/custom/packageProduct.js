const toastErrorMessage = (message) => {
    Toastify({
        text: message,
        duration: 2000,
        gravity: "top",
        stopOnFocus: true,
        position: "right",
        style: {
            background: "#F44335",
        }
    }).showToast();
}

const parseNumber = (number) => {
    return parseInt(number.replace(/,/g, ''));
}

const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const showDivAction = (id, isAdd = true) => {
    const divUnselect = document.querySelector(`#package-product-${id} #unselect-product`);
    const divSelect = document.querySelector(`#package-product-${id} #select-product`);

    if (isAdd) {
        divUnselect.style.display = 'block';
        divSelect.style.display = 'none';
    } else {
        divUnselect.style.display = 'none';
        divSelect.style.display = 'block';
    }
}

const handleAddProduct = (productID, type) => {
    const value = document.querySelector(`#package-product-${productID} #product-${productID}`).value || null;
    const price = document.querySelector(`#package-product-${productID} #product-${productID}-price`).innerHTML;
    if (!value) {
        return toastErrorMessage("Vui lòng nhập số lượng tối đa của sản phẩm");
    } else if (value <= 0) {
        return toastErrorMessage('Số lượng tối đa của sản phảm phải lớn hơn 0');
    }

    const priceSelector = document.querySelector(`#form-${type}-package #registerPrice`);
    let totalPrice = priceSelector.innerHTML || 0;
    if (totalPrice === 0) {
        totalPrice = value * parseInt(parseNumber(price));
    } else {
        totalPrice = parseNumber(totalPrice) + (value * parseInt(parseNumber(price)));
    }
    priceSelector.innerHTML = numberWithCommas(totalPrice);

    const productListInput = document.querySelector(`#form-${type}-package #registerProductList`);
    const productList = productListInput.value || null;
    if (!productList) {
        productListInput.value = `${productID}-${value}`;
    } else {
        productListInput.value = `${productList}, ${productID}-${value}`;
    }
    showDivAction(productID);
}

const handleDetailProduct = (productData) => {
    const productList = productData.split(", ").map(item => {
        let [product, limitPerPackage] = item.split("-");
        return {
            product: parseInt(product),
            limitPerPackage: parseInt(limitPerPackage)
        }
    });

    productList.forEach(item => {
        showDivAction(item.product);
        document.querySelector(`#package-product-${item.product} #product-${item.product}`).value = item.limitPerPackage;
    })
}

const handleUpdateProduct = (productID, type) => {
    const newValue = document.querySelector(`#package-product-${productID} #product-${productID}`).value || null;
    const price = document.querySelector(`#package-product-${productID} #product-${productID}-price`).innerHTML;
    if (!newValue) {
        return toastErrorMessage("Vui lòng nhập số lượng tối đa của sản phẩm");
    } else if (newValue <= 0) {
        return toastErrorMessage('Số lượng tối đa của sản phảm phải lớn hơn 0');
    }

    const productListInput = document.querySelector(`#form-${type}-package #registerProductList`);
    const productList = productListInput.value || null;
    if (!productList) {
        return toastErrorMessage("Vui lòng chọn sản phẩm");
    } else {
        // update totalPrice
        const priceSelector = document.querySelector(`#form-${type}-package #registerPrice`);
        let totalPrice = priceSelector.innerHTML || 0;
        const productListArray = productList.split(', ');
        const oldValue = productListArray.find(item => item.split('-')[0] === productID.toString()).split('-')[1];
        totalPrice = parseNumber(totalPrice) - (oldValue * parseInt(parseNumber(price)));
        totalPrice = totalPrice + (newValue * parseInt(parseNumber(price)));
        priceSelector.innerHTML = numberWithCommas(totalPrice);

        // update productList
        const index = productListArray.findIndex(item => item.split('-')[0] === productID.toString());
        productListArray[index] = `${productID}-${newValue}`;
        productListInput.value = productListArray.join(', ');
    }
}

const handleDeleteProduct = (productID, type) => {
    const productListInput = document.querySelector(`#form-${type}-package #registerProductList`);
    const price = document.querySelector(`#package-product-${productID} #product-${productID}-price`).innerHTML;

    const productList = productListInput.value || null;
    if (!productList) {
        return toastErrorMessage("Không có sản phẩm nào được chọn");
    } else {
        // update totalPrice
        const priceSelector = document.querySelector(`#form-${type}-package #registerPrice`);
        let totalPrice = priceSelector.innerHTML || 0;
        const productListArray = productList.split(', ');
        const oldValue = productListArray.find(item => item.split('-')[0] === productID.toString()).split('-')[1];
        totalPrice = parseNumber(totalPrice) - (oldValue * parseInt(parseNumber(price)));
        priceSelector.innerHTML = numberWithCommas(totalPrice);

        // update productList
        const index = productListArray.findIndex(item => item.split('-')[0] === productID.toString());
        productListArray.splice(index, 1);
        productListInput.value = productListArray.join(', ');

        document.querySelector(`#package-product-${productID} #product-${productID}`).value = null;
    }
    showDivAction(productID, false);
}