const addPersonnelModal = document.querySelector("#add-personnel-modal");
const editPersonnelModal = document.querySelector("#edit-personnel-modal");

const addPersonnelForm = document.querySelector("#add-personnel-form");
const editPersonnelForm = document.querySelector("#edit-personnel-form");

const openPersonnel = (personnelId) => location.href = `/personnel/${personnelId}`;
const openAddPersonnelModal = (unitId) => {
    addPersonnelForm["unitId"].value = unitId;
    addPersonnelModal.style.display = "flex";
}
const openEditPersonnelModal = async (idPersonnel) => {
    const personnel = await getOnePersonnel(idPersonnel);
    editPersonnelForm["idPersonnel"].value = idPersonnel;
    editPersonnelForm["unitId"].value = personnel.unitId;
    editPersonnelForm["lastName"].value = personnel.lastName;
    editPersonnelForm["firstName"].value = personnel.firstName;
    editPersonnelForm["middleName"].value = personnel.middleName;
    editPersonnelForm["licenseNumber"].value = personnel.licenseNumber;
    editPersonnelModal.style.display = "flex";
}
const closeAddPersonnelModal = () => addPersonnelModal.style.display = "none";
const closeEditPersonnelModal = () => editPersonnelModal.style.display = "none";
const addPersonnel = async (event) => {
    event.preventDefault();
    const personnelData = {
        lastName: addPersonnelForm["lastName"].value,
        firstName: addPersonnelForm["firstName"].value,
        middleName: addPersonnelForm["middleName"].value,
        licenseNumber: addPersonnelForm["licenseNumber"].value,
        unitId: addPersonnelForm["unitId"].value
    };
    await savePersonnel(personnelData);
};
const editPersonnel = async (event) => {
    event.preventDefault();
    const personnelId = editPersonnelForm["idPersonnel"].value;
    const personnelData = {
        lastName: editPersonnelForm["lastName"].value,
        firstName: editPersonnelForm["firstName"].value,
        middleName: editPersonnelForm["middleName"].value,
        licenseNumber: editPersonnelForm["licenseNumber"].value,
        unitId: editPersonnelForm["unitId"].value
    };
    await updatePersonnel(personnelId, personnelData);
};
const deletePersonnel = async (personnelId) => await destroyPersonnel(personnelId);

if (addPersonnelForm) addPersonnelForm.addEventListener("submit", addPersonnel);
if (editPersonnelForm) editPersonnelForm.addEventListener("submit", editPersonnel);

window.onclick = (event) => {
    if (event.target === addPersonnelModal) closeAddPersonnelModal();
    if (event.target === editPersonnelModal) closeEditPersonnelModal();
};

const editPersonalData = (event) => {
    event.preventDefault();
    editPersonalDataButton.classList.add("save");
    editPersonalDataButton.value = "Зберегти";
    personalDataForm.removeEventListener("submit", editPersonalData);
    personalDataForm.addEventListener("submit", savePersonalData);
    event.target.querySelectorAll("[name]").forEach((name) => name.disabled = false);
};

const savePersonalData = async (event) => {
    event.preventDefault();
    const personalDataId = event.target["personalDataId"].value;
    let personalData = {};
    event.target.querySelectorAll("[name]").forEach((name) => {
        personalData[name.name] = name.value;
    });
    await updatePersonalData(personalDataId, personalData);
};

const personalDataForm = document.querySelector("#personal-data");
const editPersonalDataButton = document.querySelector(".edit-personal-data-btn");

if (personalDataForm) personalDataForm.addEventListener("submit", editPersonalData);