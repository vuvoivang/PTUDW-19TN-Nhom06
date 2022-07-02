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

const handleAddProduct = (productID) => {
    const value = document.querySelector(`#package-product-${productID} #product-${productID}`).value || null;
    if (!value) {
        return toastErrorMessage("Vui lòng nhập số lượng tối đa của sản phẩm");
    } else if (value <= 0) {
        return toastErrorMessage('Số lượng tối đa của sản phảm phải lớn hơn 0');
    }

    const productListInput = document.querySelector("#form-add-package #registerProductList");
    const productList = productListInput.value || null;
    if (!productList) {
        productListInput.value = `${productID}-${value}`;
    } else {
        productListInput.value = `${productList}, ${productID}-${value}`;
    }

    showDivAction(productID);
}

const handleUpdateProduct = (productID) => {
    const value = document.querySelector(`#package-product-${productID} #product-${productID}`).value || null;
    if (!value) {
        return toastErrorMessage("Vui lòng nhập số lượng tối đa của sản phẩm");
    } else if (value <= 0) {
        return toastErrorMessage('Số lượng tối đa của sản phảm phải lớn hơn 0');
    }

    const productListInput = document.querySelector("#form-add-package #registerProductList");
    const productList = productListInput.value || null;
    if (!productList) {
        return toastErrorMessage("Không có sản phẩm nào được chọn");
    } else {
        const productListArray = productList.split(', ');
        const newProductList = productListArray.map(item => {
            const itemArray = item.split('-');
            if (itemArray[0] === productID.toString()) {
                return `${productID}-${value}`;
            }
            return item;
        });
        productListInput.value = newProductList.join(', ');
    }

}

const handleDeleteProduct = (productID) => {
    const productListInput = document.querySelector("#form-add-package #registerProductList");
    const productList = productListInput.value || null;
    if (!productList) {
        return toastErrorMessage("Không có sản phẩm nào được chọn");
    } else {
        const productListArray = productList.split(', ');
        const newProductList = productListArray.filter(item => item.split('-')[0] !== productID.toString());
        productListInput.value = newProductList.join(', ');

        document.querySelector(`#package-product-${productID} #product-${productID}`).value = null;
    }

    showDivAction(productID, false);
}