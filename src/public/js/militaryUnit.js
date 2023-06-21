const addMilitaryUnitForm = document.querySelector("#add-military-unit-form");
const editMilitaryUnitForm = document.querySelector("#edit-military-unit-form");

const addMilitaryUnit = async (event) => {
    event.preventDefault();
    const militaryUnitData = {
        nameMilitaryUnit: addMilitaryUnitForm["nameMilitaryUnit"].value,
        garrisonId: addMilitaryUnitForm["garrisonId"].value,
    };

    await saveMilitaryUnit(militaryUnitData);
};

const editMilitaryUnit = async (event) => {
    event.preventDefault();
    const {value} = editMilitaryUnitForm["id"];
    const militaryUnitData = {
        nameMilitaryUnit: editMilitaryUnitForm["nameMilitaryUnit"].value,
        garrisonId: editMilitaryUnitForm["garrisonId"].value,
    };
    await updateMilitaryUnit(value, militaryUnitData);
};

const delMilitaryUnit = async (event) => {
    event.preventDefault();
    const {value} = editMilitaryUnitForm["id"];
    await deleteMilitaryUnit(value);
};

addMilitaryUnitForm.addEventListener("submit", addMilitaryUnit);
editMilitaryUnitForm.addEventListener("submit", editMilitaryUnit);

editMilitaryUnitForm.querySelector("#delete-military-unit").addEventListener("click", delMilitaryUnit);