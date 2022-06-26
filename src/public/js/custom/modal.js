function handleCategoryModal(data, type) {
    if (type === "add-category") {
        document.querySelector("#form-add-category #category-name").value = ""
        document.querySelector("#form-add-category #category-image").value = null
    } else if (type === "update-category") {
        document.querySelector("#form-update-category #category-id").value = data._id
        document.querySelector("#form-update-category #category-name").value = data.name
    } else if (type === "delete-category") {
        document.querySelector("#form-delete-category #category-id").value = data._id
    }
}

function handleDeleteProductModal(data) {
    document.querySelector("#form-delete-product #product-id").value = data._id
}