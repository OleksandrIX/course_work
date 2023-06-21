const addUserModal = document.querySelector("#add-user-modal");
const editUserModal = document.querySelector("#edit-user-modal");

const openAddUserModal = () => addUserModal.style.display = "flex";
const openEditUserModal = () => editUserModal.style.display = "flex";
const closeAddUserModal = () => addUserModal.style.display = "none";
const closeEditUserModal = () => editUserModal.style.display = "none";


const addGarrisonModal = document.querySelector("#add-garrison-modal");
const editGarrisonModal = document.querySelector("#edit-garrison-modal");

const openAddGarrisonModal = async () => {
    const users = await getAllUsers();
    const selectUser = addGarrisonForm["userId"];
    selectUser.innerHTML = "";
    for (const user of users) {
        const optionUser = document.createElement("option");
        optionUser.value = user.id;
        optionUser.textContent = user.username;
        selectUser.appendChild(optionUser);
    }

    addGarrisonModal.style.display = "flex";
};
const openEditGarrisonModal = () => editGarrisonModal.style.display = "flex";
const closeAddGarrisonModal = () => addGarrisonModal.style.display = "none";
const closeEditGarrisonModal = () => editGarrisonModal.style.display = "none";


const addMilitaryUnitModal = document.querySelector("#add-military-unit-modal");
const editMilitaryUnitModal = document.querySelector("#edit-military-unit-modal");

const openAddMilitaryUnitModal = () => addMilitaryUnitModal.style.display = "flex";
const openEditMilitaryUnitModal = async (id) => {
    const militaryUnit = await getOneMilitaryUnit(id);
    editMilitaryUnitForm["id"].value = militaryUnit.id;
    editMilitaryUnitForm["nameMilitaryUnit"].value = militaryUnit.nameMilitaryUnit;
    editMilitaryUnitModal.style.display = "flex";
};
const closeAddMilitaryUnitModal = () => addMilitaryUnitModal.style.display = "none";
const closeEditMilitaryUnitModal = () => editMilitaryUnitModal.style.display = "none";


const addServicemanModal = document.querySelector("#add-serviceman-modal");

const openAddServicemanModal = () => addServicemanModal.style.display = "flex";
const closeAddServicemanModal = () => addServicemanModal.style.display = "none";

window.onclick = (event) => {
    if (event.target === addUserModal) addUserModal.style.display = "none";
    if (event.target === editUserModal) editUserModal.style.display = "none";

    if (event.target === addGarrisonModal) addGarrisonModal.style.display = "none";
    if (event.target === editGarrisonModal) editGarrisonModal.style.display = "none";

    if (event.target === addMilitaryUnitModal) addMilitaryUnitModal.style.display = "none";
    if (event.target === editMilitaryUnitModal) editMilitaryUnitModal.style.display = "none";

    if (event.target === addServicemanModal) addServicemanModal.style.display = "none";
};

document.addEventListener("keyup", (event) => {
    if (event.keyCode === 27) {
        if (addUserModal) addUserModal.style.display = "none";
        if (editUserModal) editUserModal.style.display = "none";

        if (addGarrisonModal) addGarrisonModal.style.display = "none";
        if (editGarrisonModal) editGarrisonModal.style.display = "none";

        if (addMilitaryUnitModal) addMilitaryUnitModal.style.display = "none";
        if (editMilitaryUnitModal) editMilitaryUnitModal.style.display = "none";

        if (addServicemanModal) addServicemanModal.style.display = "none";
    }
});