var searchInput = document.getElementsByClassName('search-innut');
var addNameIn = document.getElementById('add-name');
var addCapacityIn = document.getElementById('add-capacity');

function showToast(message) {
    document.getElementById("snackbar").innerHTML = message;
    document.getElementById("snackbar").style.color = "#008000";
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(() => {
        x.className = x.className.replace("show", "");
    }, 3000);
}

function addLocation() {
    let name = addNameIn.value;
    let capacity = addCapacityIn.value;

    if (name == '' || capacity == '') {
        console.log('Please provide name and capacity');
    }
    else {
        const res = axios({
            method: "POST",
            url: "http://localhost:3000/api/v1/location/create",
            data: {
                name,
                capacity
            }
        });
        showToast('Thêm cơ sở điều / cách ly thành công');
        location.href = '/admin/place';
    }
}

function editLocation(_id) {
    let name = document.getElementById(`edit-name-${_id}`).value;
    let capacity = document.getElementById(`edit-capacity-${_id}`).value;

    const res = axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/location/edit",
        data: {
            id: _id,
            name,
            capacity
        }
    });
    showToast('Thay đổi thông tin cơ sở điều trị / cách ly thành công');
    location.href = '/admin/place';
}