const API_URL = 'https://covid-19-management-sys-19tn.herokuapp.com/';

const handleAddProduct = async () => {
    const formData = getFormInput('add');
    const res = await fetch(`${API_URL}/manager/product-management`, {
        method: 'POST',
        body: formData,
    });
    const data = await res.json();
    if (data.status === 'success') {
        toastMessage(data.message, 'success', true);
    } else {
        toastMessage(data.message || 'Có lỗi xảy ra, vui lòng thử lại', 'error');
    }
};

const handleUpdateProduct = async () => {
    const id = document.querySelector('#form-update-product #registerId').value;
    const formData = getFormInput('update');

    const res = await fetch(`${API_URL}/manager/product-management/${id}`, {
        method: 'PUT',
        body: formData,
    });
    const data = await res.json();
    if (data.status === 'success') {
        toastMessage(data.message, 'success');
    } else {
        toastMessage(data.message || 'Có lỗi xảy ra, vui lòng thử lại', 'error');
    }
};

const handleDeleteProduct = async () => {
    const id = document.querySelector('#form-delete-product #product-id').value;
    const res = await fetch(`${API_URL}/manager/product-management/${id}`, {
        method: 'DELETE',
    });
    const data = await res.json();
    if (data.status === 'success') {
        toastMessage(data.message, 'success');
    } else {
        toastMessage(data.message || 'Có lỗi xảy ra, vui lòng thử lại', 'error');
    }
};

const getFormInput = (type) => {
    const name = document.querySelector(`#form-${type}-product #registerName`).value;
    const price = document.querySelector(`#form-${type}-product #registerPrice`).value;
    const unit = document.querySelector(`#form-${type}-product #registerUnit`).value;
    const category = document.querySelector(`#form-${type}-product #registerCategory`).value;
    const images = document.querySelector(`#form-${type}-product #registerImages`).files;
    const description = document.querySelector(`#form-${type}-product #registerDescription`).value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('unit', unit);
    formData.append('category', category);
    for (let image of images) {
        formData.append('images', image);
    }
    if (description) {
        formData.append('description', description);
    }

    return formData;
};

// utils
const toastMessage = (message, type = 'success', isRedirect = false) => {
    Toastify({
        text: message,
        duration: 1000,
        gravity: 'top',
        stopOnFocus: true,
        position: 'right',
        style: {
            background: type === 'success' ? '#4CAF50' : '#F44335',
        },
        callback: function () {
            if (type == 'success') {
                isRedirect ? (window.location.href = '/manager/product-management') : window.location.reload();
            }
        },
    }).showToast();
};
