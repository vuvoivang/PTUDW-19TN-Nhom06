// const handleCategoryModal = (data, formId = "") => {
//     const form = document.getElementById(formId);
    
//     // add category
//     if(formId === "form-category") {

//     }
// }

// const handleCategoryModala = (data, formId = '') => {
//     const form = document.querySelector(`#${formId}`);

//     // create new category
//     if(formId === 'form-submit') {
//         if (!data) {
//             document.getElementById('name').value = "";
//             return;
//         }

//         // update category
//         form.action = form.action + '?_method=PUT';
//         const { name, category_id } = data;
//         document.getElementById('name').value = name;
//         document.getElementById('category_id').value = category_id;

//     } else {
//         // delete modal
//         const category_id = data.getAttribute('data-id')
//         document.getElementById('delete_category_id').value = category_id;
//     }
// }