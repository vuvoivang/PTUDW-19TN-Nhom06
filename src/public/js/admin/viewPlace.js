// const API_URL = "https://covid-19-management-sys-19tn.herokuapp.com";

var searchInput = document.getElementsByClassName('search-innut');
var addNameIn = document.getElementById('add-name');
var addCapacityIn = document.getElementById('add-capacity');

function showToast(message, color) {
    document.getElementById("snackbar").innerHTML = message;
    document.getElementById("snackbar").style.color = color;
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
        fetch(`${API_URL}/api/v1/location/create`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                name,
                capacity
            })
        }).then(resp => resp.json())
            .then(res => {
                if (res.result === 'success') {
                    showToast('Thêm cơ sở điều / cách ly thành công', "#008000");
                    location.reload();
                }
                else {
                    showToast('Thêm cơ sở điều / cách ly thất bại', "red");
                }
            });
    }
}

function editLocation(_id) {
    let name = document.getElementById(`edit-name-${_id}`).value;
    let capacity = document.getElementById(`edit-capacity-${_id}`).value;

    fetch(`${API_URL}/api/v1/location/edit`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            id: _id,
            name,
            capacity
        })
    }).then(resp => resp.json())
        .then(res => {
            if (res.result === 'success') {
                showToast('Thay đổi thông tin cơ sở điều trị / cách ly thành công', "#008000");
                location.reload();
            }
            else {
                showToast('Thêm cơ sở điều / cách ly thất bại', "red");
            }
        });
}