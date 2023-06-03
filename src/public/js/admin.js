const unitsContainer = document.querySelector(".units-container");
const usersContainer = document.querySelector(".users-container");
const unitBtn = document.querySelector(".unit-user-navbar .units");
const userBtn = document.querySelector(".unit-user-navbar .users");

const addUnitModal = document.querySelector("#add-unit-modal");
const addUserModal = document.querySelector("#add-user-modal");
const editUnitModal = document.querySelector("#edit-unit-modal");
const editUserModal = document.querySelector("#edit-user-modal");

const addUnitForm = document.querySelector("#add-unit-form");
const addUserForm = document.querySelector("#add-user-form");
const editUnitForm = document.querySelector("#edit-unit-form");
const editUserForm = document.querySelector("#edit-user-form");

const selectUnits = () => {
    unitsContainer.style.display = "flex";
    usersContainer.style.display = "none";
    unitBtn.className = "units selected";
    userBtn.className = "users";
};
const selectUsers = () => {
    unitsContainer.style.display = "none";
    usersContainer.style.display = "flex";
    unitBtn.className = "units";
    userBtn.className = "users selected";
};

const openUnit = (unitId) => location.href = `/units/${unitId}`;

const openAddUnitModal = async () => {
    const responseUsers = await getUsers();
    const users = responseUsers.filter((user) => {
        if (!user.unit) {
            return {
                id: user.id,
                lastName: user.lastName,
                firstName: user.firstName,
                middleName: user.middleName,
            };
        }
    });

    if (users.length === 0) {
        if (confirm("Немає вільник користувачів.\nСтворити користувача?"))
            addUserModal.style.display = "flex";
    } else {
        const selectUser = addUnitForm["userId"];
        selectUser.innerHTML = "";
        for (const user of users) {
            const option = document.createElement("option");
            option.value = user.id;
            option.textContent = `${user.lastName} ${user.firstName[0].toUpperCase()}.${user.middleName[0].toUpperCase()}.`;
            selectUser.appendChild(option);
        }
        addUnitModal.style.display = "flex";
    }
};
const openAddUserModal = () => addUserModal.style.display = "flex";
const openEditUnitModal = async (unitId) => {
    const unit = await getUnit(unitId);
    const responseUsers = await getUsers();
    const users = responseUsers.filter((user) => {
        if (!user.unit) {
            return {
                id: user.id,
                lastName: user.lastName,
                firstName: user.firstName,
                middleName: user.middleName,
            };
        }
    });
    users.unshift(await getUser(unit.userId));

    const selectUser = editUnitForm["userId"];
    selectUser.innerHTML = "";
    for (const user of users) {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = `${user.lastName} ${user.firstName[0].toUpperCase()}.${user.middleName[0].toUpperCase()}.`;
        selectUser.appendChild(option);
    }

    editUnitForm["idUnit"].value = unit.id;
    editUnitForm["unitName"].value = unit.unitName;
    editUnitForm["userId"].value = unit.userId;
    editUnitModal.style.display = "flex";
}
const openEditUserModal = async (userId) => {
    const user = await getUser(userId);
    editUserForm["idUser"].value = user.id;
    editUserForm["username"].value = user.username;
    editUserForm["licenseNumber"].value = user.licenseNumber;
    editUserForm["lastName"].value = user.lastName;
    editUserForm["firstName"].value = user.firstName;
    editUserForm["middleName"].value = user.middleName;
    editUserModal.style.display = "flex";
}
const closeAddUnitModal = () => addUnitModal.style.display = "none";
const closeAddUserModal = () => addUserModal.style.display = "none";
const closeEditUnitModal = () => editUnitModal.style.display = "none";
const closeEditUserModal = () => editUserModal.style.display = "none";

const addUnit = async (event) => {
    event.preventDefault();
    const unitData = {
        unitName: addUnitForm["unitName"].value,
        userId: addUnitForm["userId"].value
    };
    await saveUnit(unitData);
};
const addUser = async (event) => {
    event.preventDefault();
    const userData = {
        username: addUserForm["username"].value,
        password: addUserForm["password"].value,
        lastName: addUserForm["lastName"].value,
        firstName: addUserForm["firstName"].value,
        middleName: addUserForm["middleName"].value,
        licenseNumber: addUserForm["licenseNumber"].value
    };
    await saveUser(userData);
};

const editUnit = async (event) => {
    event.preventDefault();
    const unitId = editUnitForm["idUnit"].value;
    const unitData = {
        unitName: editUnitForm["unitName"].value,
        userId: editUnitForm["userId"].value
    };
    await updateUnit(unitId, unitData);
};

const editUser = async (event) => {
    event.preventDefault();
    const userId = editUserForm["idUser"].value;
    const userData = {
        username: editUserForm["username"].value,
        lastName: editUserForm["lastName"].value,
        firstName: editUserForm["firstName"].value,
        middleName: editUserForm["middleName"].value,
        licenseNumber: editUserForm["licenseNumber"].value
    };
    await updateUser(userId, userData);
};

const deleteUnit = async (unitId) => await destroyUnit(unitId);
const deleteUser = async (userId) => await destroyUser(userId);

window.onclick = (event) => {
    if (event.target === addUnitModal) closeAddUnitModal();
    if (event.target === addUserModal) closeAddUserModal();
    if (event.target === editUnitModal) closeEditUnitModal();
    if (event.target === editUserModal) closeEditUserModal();
};

if (addUnitForm) addUnitForm.addEventListener("submit", addUnit);
if (addUserForm) addUserForm.addEventListener("submit", addUser);
if (editUnitForm) editUnitForm.addEventListener("submit", editUnit);
if (editUserForm) editUserForm.addEventListener("submit", editUser);
