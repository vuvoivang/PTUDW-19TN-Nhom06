const handleRelate = (id, type) => {
    const relate = document.querySelector(`#patient-relate-${id} #check-relate-${id}`).checked;
    const relateInput = document.querySelector(`#form-${type}-patient #registerRelates`);
    if (relate) {
        handleAddRelate(id, relateInput);
    } else {
        handleRemoveRelate(id, relateInput);
    }
}

const handleAddRelate = (id, relateInput) => {
    const relateList = relateInput.value || null;
    if (!relateList) {
        relateInput.value = `${id}`;
    } else {
        relateInput.value = `${relateList}, ${id}`;
    }
}

const handleRemoveRelate = (id, relateInput) => {
    const relateList = relateInput.value || null;
    if (!relateList) {
        return;
    } else {
        const newRelateList = relateList.split(", ").filter(item => item !== `${id}`);
        relateInput.value = newRelateList.join(", ");
    }
}

const handleDetailPatient = (relateData) => {
    const relateList = relateData.split(", ").map(id => parseInt(id));
    relateList.forEach(id => {
        document.querySelector(`#patient-relate-${id} #check-relate-${id}`).checked = true;
    })
}