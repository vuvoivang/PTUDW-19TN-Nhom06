function handleCategoryModal(data, type) {
    console.log("data", data)
    if (type === "add-category") {
        document.querySelector("#form-add-category #category-name").value = ""
        document.querySelector("#form-add-category #category-image").value = ""
    } else if (type === "update-category") {
        document.querySelector("#form-update-category #category-id").value = data._id
        document.querySelector("#form-update-category #category-name").value = data.name
        document.querySelector("#form-update-category #category-image").value = data.image
    } else if (type === "delete-category") {
        document.querySelector("#form-delete-category #category-id").value = data._id
    }
}

module.exports = {
    handleCategoryModal
}