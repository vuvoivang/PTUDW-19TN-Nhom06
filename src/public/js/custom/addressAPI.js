
const provinceInput = document.querySelector('#registerProvince')
const districtInput = document.querySelector('#registerDistrict')
const wardInput = document.querySelector('#registerWard')

// initial state
districtInput.disabled = true
wardInput.disabled = true
districtInput.innerHTML = '<option hidden disabled selected value> -- Chọn quận huyện -- </option>'
wardInput.innerHTML = '<option hidden disabled selected value> -- Chọn phường xã -- </option>'


// API string
const provinceAPI = (provinceCode) => {
    return `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
}

const districtAPI = (districtCode) => {
    return `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
}

// fetching function
const fetchProvinces = async () => {
    const provincesResponse = await fetch('https://provinces.open-api.vn/api/')
    const provincesData = await provincesResponse.json()
    const provinces = provincesData.map(province => {
        return `<option data-province-code=${province.code} value="${province.name}">${province.name}</option>`
    }).join('\n')
    return provinces
}

const fetchDistricts = async (provinceCode) => {
    districtInput.innerHTML = '<option hidden disabled selected value> -- Chọn quận huyện -- </option>'
    const districtResponse = await fetch(provinceAPI(provinceCode))
    districtInput.disabled = false
    wardInput.disabled = true
    const districtsData = await districtResponse.json()
    const districts = districtsData.districts.map(district => {
        return `<option data-district-code=${district.code} value="${district.name}">${district.name}</option>`
    }).join('\n')
    return districts
}

const fetchWards = async (districtCode) => {
    wardInput.innerHTML = '<option hidden disabled selected value> -- Chọn phường xã -- </option>'
    const wardResponse = await fetch(districtAPI(districtCode))
    wardInput.disabled = false
    const wardsData = await wardResponse.json()
    const wards = wardsData.wards.map(ward => {
        return `<option data-wardCode=${ward.code} value="${ward.name}">${ward.name}</option>`
    }).join('\n')
    return wards
}


const fetchAPI = async () => {
    provinceInput.innerHTML = '<option hidden disabled selected value> -- Chọn thành phố -- </option>'
    const provinces = await fetchProvinces()
    provinceInput.innerHTML += provinces

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