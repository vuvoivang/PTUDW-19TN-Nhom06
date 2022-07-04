
const provinceInput = document.querySelector('#registerProvince')
const districtInput = document.querySelector('#registerDistrict')
const wardInput = document.querySelector('#registerWard')

let patientProvinceCode = null;
let patientDistrictCode = null;

// API string
const provinceAPI = (provinceCode) => {
    return `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
}

const districtAPI = (districtCode) => {
    return `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
}

// fetching function
const fetchProvinces = async (type = "add", patientProvince = null) => {
    const provincesResponse = await fetch('https://provinces.open-api.vn/api/')
    const provincesData = await provincesResponse.json()
    let provinces = [];
    if (type === "add") {
        provinces = provincesData.map(province => {
            return `<option data-province-code=${province.code} value="${province.name}">${province.name}</option>`
        })
    } else {
        provinces = provincesData.map(province => {
            if (province.name === patientProvince) {
                patientProvinceCode = province.code;
                return `<option data-province-code=${province.code} value="${province.name}" selected="selected">${province.name}</option>`
            } else {
                return `<option data-province-code=${province.code} value="${province.name}">${province.name}</option>`
            }
        })
    }
    return provinces.join('\n');
}

const fetchDistricts = async (provinceCode, type = "add", patientDistrict = null) => {
    const districtResponse = await fetch(provinceAPI(provinceCode));
    const districtsData = await districtResponse.json();
    let districts = []
    if (type === "add") {
        districtInput.innerHTML = '<option hidden disabled selected value> -- Chọn quận huyện -- </option>'
        districtInput.disabled = false
        wardInput.disabled = true
        districts = districtsData.districts.map(district => {
            return `<option data-district-code=${district.code} value="${district.name}">${district.name}</option>`
        })
    } else {
        districts = districtsData.districts.map(district => {
            if (district.name === patientDistrict) {
                patientDistrictCode = district.code;
                return `<option data-district-code=${district.code} value="${district.name}" selected="selected">${district.name}</option>`
            } else {
                return `<option data-district-code=${district.code} value="${district.name}">${district.name}</option>`
            }
        })
    }
    return districts.join('\n');
}

const fetchWards = async (districtCode, type = "add", patientWard = null) => {
    const wardResponse = await fetch(districtAPI(districtCode))
    const wardsData = await wardResponse.json()
    let wards = [];
    if (type === "add") {
        wardInput.innerHTML = '<option hidden disabled selected value> -- Chọn phường xã -- </option>'
        wardInput.disabled = false
        wards = wardsData.wards.map(ward => {
            return `<option data-wardCode=${ward.code} value="${ward.name}">${ward.name}</option>`
        })
    } else {
        wards = wardsData.wards.map(ward => {
            if (ward.name === patientWard) {
                return `<option data-wardCode=${ward.code} value="${ward.name}" selected="selected">${ward.name}</option>`
            } else {
                return `<option data-wardCode=${ward.code} value="${ward.name}">${ward.name}</option>`
            }
        })
    }
    return wards.join('\n');
}

const fetchAddressPatient = async (province, district, ward) => {
    const provinces = await fetchProvinces("update", province)
    const districts = await fetchDistricts(patientProvinceCode, "update", district)
    const wards = await fetchWards(patientDistrictCode, "update", ward)
    return { provinces, districts, wards }
}

const fetchAPI = async (type = "add") => {
    if (type == "add") {
        // add patient
        districtInput.disabled = true
        wardInput.disabled = true
        districtInput.innerHTML = '<option hidden disabled selected value> -- Chọn quận huyện -- </option>'
        wardInput.innerHTML = '<option hidden disabled selected value> -- Chọn phường xã -- </option>'

        provinceInput.innerHTML = '<option hidden disabled selected value> -- Chọn thành phố -- </option>'
        const provinces = await fetchProvinces()
        provinceInput.innerHTML += provinces

    } else {
        // update patient
        const patientProvince = document.getElementById('patientProvince').value;
        const patientDistrict = document.getElementById('patientDistrict').value;
        const patientWard = document.getElementById('patientWard').value;

        const { provinces, districts, wards } = await fetchAddressPatient(patientProvince, patientDistrict, patientWard);
        provinceInput.innerHTML = provinces
        districtInput.innerHTML = districts
        wardInput.innerHTML = wards
    }

    provinceInput.addEventListener('change', async (event) => {
        const currentSelection = event.target.options[event.target.selectedIndex]
        const districts = await fetchDistricts(currentSelection.getAttribute('data-province-code'))
        districtInput.innerHTML += districts
    })

    districtInput.addEventListener('change', async (event) => {
        const currentSelection = event.target.options[event.target.selectedIndex]
        const wards = await fetchWards(currentSelection.getAttribute('data-district-code'))
        wardInput.innerHTML += wards
    })
}