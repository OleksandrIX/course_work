const addServicemanForm = document.querySelector("#add-serviceman-form");
const servicemanInfoForm = document.querySelector("#serviceman-info");
const currentLocationForm = document.querySelector("#current-location");
const permanentLocationForm = document.querySelector("#permanent-location");

let garrisonId, garrisonSelect, currentMilitaryUnitSelect, permanentMilitaryUnitSelect, garrisons = [];
if (addServicemanForm) {
    garrisonId = addServicemanForm["garrisonId"].value;
    garrisonSelect = addServicemanForm["garrisons"];
    currentMilitaryUnitSelect = addServicemanForm["currentMilitaryUnitId"];
    permanentMilitaryUnitSelect = addServicemanForm["permanentMilitaryUnitId"];
}

if (permanentLocationForm) {
    garrisonId = permanentLocationForm["garrisonId"].value;
    garrisonSelect = permanentLocationForm["garrisons"];
    currentMilitaryUnitSelect = currentLocationForm["currentMilitaryUnitId"];
    permanentMilitaryUnitSelect = permanentLocationForm["permanentMilitaryUnitId"];
}

(async () => {
    const currentMilitaryUnits = await getAllMilitaryUnitsInGarrison(garrisonId);
    currentMilitaryUnits.forEach((currentMilitaryUnit) => {
        const option = document.createElement("option");
        option.value = currentMilitaryUnit.id;
        option.textContent = currentMilitaryUnit.nameMilitaryUnit;
        currentMilitaryUnitSelect.appendChild(option);
    });
})();

(async () => {
    garrisons = (await getAllGarrisons()).filter((garrison) => garrison.id !== parseInt(garrisonId));
    garrisons.forEach((garrison) => {
        const option = document.createElement("option");
        option.value = garrison.id;
        option.textContent = garrison.nameGarrison;
        garrisonSelect.appendChild(option);
    });

    updatePermanentMilitaryUnitSelect();
})();


const updatePermanentMilitaryUnitSelect = () => {
    const selectedGarrisonId = garrisonSelect.value;
    permanentMilitaryUnitSelect.innerHTML = "";

    const {military_units: militaryUnits} = garrisons.filter((garrison) => garrison.id === parseInt(selectedGarrisonId))[0];
    militaryUnits.forEach((militaryUnit) => {
        const option = document.createElement("option");
        option.value = militaryUnit.id;
        option.textContent = militaryUnit.nameMilitaryUnit;
        permanentMilitaryUnitSelect.appendChild(option);
    })
};

if (garrisonSelect) garrisonSelect.addEventListener("change", updatePermanentMilitaryUnitSelect);

const fillServicemanInfoForm = (values) => {
    const inputs = servicemanInfoForm.querySelectorAll("[name]");
    inputs.forEach((input, index) => {
        input.value = values[index];
    });
};

const fillCurrentLocationForm = async (currentLocation) => {
    currentLocationForm.querySelector("#edit-current-military-unit").value =
        (await getOneGarrison(currentLocation.garrison)).nameGarrison;
    currentLocationForm["currentMilitaryUnitId"].value = currentLocation.militaryUnit;
};

const fillPermanentLocationForm = async (permanentLocation) => {
    permanentLocationForm["garrisons"].value = (await getOneGarrison(parseInt(permanentLocation.garrison))).id;
    updatePermanentMilitaryUnitSelect()
    permanentLocationForm["permanentMilitaryUnitId"].value = permanentLocation.militaryUnit;
};

const addServiceman = async (event) => {
    event.preventDefault();
    const servicemanData = {
        lastName: addServicemanForm["lastName"].value,
        firstName: addServicemanForm["firstName"].value,
        middleName: addServicemanForm["middleName"].value,
        militaryRank: addServicemanForm["militaryRank"].value,
        position: addServicemanForm["position"].value,
        currentMilitaryUnitId: addServicemanForm["currentMilitaryUnitId"].value,
        permanentMilitaryUnitId: addServicemanForm["permanentMilitaryUnitId"].value,
    };

    await saveServiceman(servicemanData);
};

if (addServicemanForm) addServicemanForm.addEventListener("submit", addServiceman);

const editServiceman = async (event) => {
    event.preventDefault();
    const servicemanId = servicemanInfoForm["servicemanId"].value;
    const servicemanData = {
        servicemanId: servicemanInfoForm["servicemanId"].value,
        lastName: servicemanInfoForm["lastName"].value,
        firstName: servicemanInfoForm["firstName"].value,
        middleName: servicemanInfoForm["middleName"].value,
        position: servicemanInfoForm["position"].value,
        militaryRank: servicemanInfoForm["militaryRank"].value,
        currentMilitaryUnitId: currentLocationForm["currentMilitaryUnitId"].value,
        permanentMilitaryUnitId: permanentLocationForm["permanentMilitaryUnitId"].value,
    };

    await updateServiceman(servicemanId, servicemanData);
};

const enabledSaveButton = (form) => {
    const editButton = form.querySelector(".edit-button");
    const enabledSave = (event) => {
        event.preventDefault();

        const inputs = form.querySelectorAll("[name]");
        inputs.forEach((input) => {
            input.removeAttribute("disabled");
        });

        editButton.classList.add("save-button");
        editButton.value = "Зберегти";
        editButton.classList.remove("edit-button");

        editButton.removeEventListener("click", enabledSave);
        const saveButton = form.querySelector(".save-button");
        saveButton.addEventListener("click", async (event) => {
            event.preventDefault();
            await editServiceman(event);
        });
    };
    editButton.addEventListener("click", enabledSave);
};


if (servicemanInfoForm) {
    enabledSaveButton(servicemanInfoForm);
    const deleteButton = servicemanInfoForm.querySelector(".delete-button");
    deleteButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const servicemanId = servicemanInfoForm["servicemanId"].value;
        await deleteServiceman(servicemanId);
    });
}

if (currentLocationForm) {
    enabledSaveButton(currentLocationForm);
}

if (permanentLocationForm) {
    enabledSaveButton(permanentLocationForm);
}