const showUserModal = document.querySelector("#show-user-modal");
const openShowUserModal = document.querySelectorAll(".open-show-user-modal");
const closeShowUserModal = document.querySelector("#close-show-user-modal");

if (openShowUserModal.length !== 0) {
    for (let i = 0; i < openShowUserModal.length; i++) {
        openShowUserModal[i].addEventListener("dblclick", openUserInfo);
    }
}

if (closeShowUserModal) closeShowUserModal.addEventListener("click", closeUserInfo);

function openUserInfo(event) {
    const userInfo = document.querySelector(".user-info");
    const userId = event.target.parentElement.children[0].value;

    fetch(apiUrl + `/users/${userId}`)
        .then((res) => {
            if (res.status === 200) return res.json();
            else {
                const errorMessage = document.createElement("p");
                errorMessage.textContent = "Такого користувача немає";
                errorMessage.className = "user-info-error-message";
                userInfo.appendChild(errorMessage);
            }
        })
        .then(({user}) => {
            createUserInfo(user, userInfo);
        })
        .catch((err) => console.log(err));

    showUserModal.style.display = "flex";
}

function createUserInfo(user, userInfo) {
    const infoContainer = document.createElement("div");
    infoContainer.className = "info-container";

    const propertyBlock = document.createElement("div");
    propertyBlock.className = "property-block";

    const usernameProperty = document.createElement("h2");
    const roleProperty = document.createElement("h2");
    const statusProperty = document.createElement("h2");

    usernameProperty.textContent = "Ім'я:";
    roleProperty.textContent = "Роль:";
    statusProperty.textContent = "Статус:";

    propertyBlock.appendChild(usernameProperty);
    propertyBlock.appendChild(roleProperty);
    propertyBlock.appendChild(statusProperty);

    const valueBlock = document.createElement("div");
    valueBlock.className = "value-block";

    const usernameValue = document.createElement("input");
    usernameValue.id = "username-show";
    usernameValue.type = "text";
    usernameValue.value = user.username;
    usernameValue.disabled = true;

    const roleValue = document.createElement("input");
    roleValue.id = "role-show";
    roleValue.type = "text";
    roleValue.value = user.role;
    roleValue.disabled = true;

    const statusValue = document.createElement("input");
    statusValue.id = "status-show";
    statusValue.type = "text";
    statusValue.value = user.isActive ? "активний" : "не активний";
    statusValue.disabled = true;

    valueBlock.appendChild(usernameValue);
    valueBlock.appendChild(roleValue);
    valueBlock.appendChild(statusValue);

    infoContainer.appendChild(propertyBlock);
    infoContainer.appendChild(valueBlock);

    const groupBtn = document.createElement("div");
    groupBtn.className = "group-btn";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "btn";
    editBtn.textContent = "Редагувати ім'я";
    editBtn.onclick = () => {
        openEditUser(user.id_user, user.username);
    };

    const changePasswordBtn = document.createElement("button");
    changePasswordBtn.type = "button";
    changePasswordBtn.className = "btn";
    changePasswordBtn.textContent = "Змінити пароль";
    changePasswordBtn.onclick = () => {
        changePasswordUserForm["id_user"].value = user.id_user;

        showUserModal.style.display = "none";
        changePasswordUserModal.style.display = "flex";
    };

    const deleteUserBtn = document.createElement("button");
    deleteUserBtn.type = "button";
    deleteUserBtn.className = "btn";
    deleteUserBtn.textContent = "Видалити";
    deleteUserBtn.onclick = () => {
        deleteUser(user.id_user)
    };

    groupBtn.appendChild(editBtn);
    groupBtn.appendChild(changePasswordBtn);
    groupBtn.appendChild(deleteUserBtn);

    userInfo.appendChild(infoContainer);
    userInfo.appendChild(groupBtn);
}

function openEditUser(userId, username) {
    showUserModal.style.display = "none";

    const editUserModalContent = document.querySelector(".edit-user-modal-content");

    const editUserForm = document.createElement("form");
    editUserForm.id = "edit-user-form";
    editUserForm.className = "modal-form";

    const inputUserId = document.createElement("input");
    inputUserId.type = "hidden";
    inputUserId.name = "id_user";
    inputUserId.value = userId;

    const inputWrapper = document.createElement("div");
    inputWrapper.className = "input-wrapper";

    const inputBlock = document.createElement("div");
    inputBlock.className = "input-block";

    const labelUsernameEdit = document.createElement("label");
    labelUsernameEdit.setAttribute("for", "username-edit");
    labelUsernameEdit.textContent = "Ім'я користувача:";

    const inputUsernameEdit = document.createElement("input");
    inputUsernameEdit.id = "username-edit";
    inputUsernameEdit.name = "username";
    inputUsernameEdit.type = "text";
    inputUsernameEdit.required = true;
    inputUsernameEdit.autofocus = true;
    inputUsernameEdit.minLength = 3;
    inputUsernameEdit.maxLength = 12;
    inputUsernameEdit.value = username;

    inputBlock.appendChild(labelUsernameEdit);
    inputBlock.appendChild(inputUsernameEdit);

    inputWrapper.appendChild(inputBlock);

    const editUserBtn = document.createElement("input");
    editUserBtn.className = "btn edit-user-btn btn-modal";
    editUserBtn.type = "submit";
    editUserBtn.value = "Редагувати";

    editUserForm.appendChild(inputUserId);
    editUserForm.appendChild(inputWrapper);
    editUserForm.appendChild(editUserBtn);

    editUserForm.onsubmit = (event) => {
        event.preventDefault();
        const userData = {
            username: editUserForm["username"].value
        };

        updateUser(userId, userData);
    };

    editUserModalContent.appendChild(editUserForm);

    editUserModal.style.display = "flex";
}

function closeUserInfo() {
    const userInfo = document.querySelector(".user-info");
    userInfo.textContent = "";
    showUserModal.style.display = "none";
}

function closeEditUser() {
    const editUserForm = document.querySelector("#edit-user-form");
    editUserModal.children[0].removeChild(editUserForm);
}

const addUserModal = document.querySelector("#add-user-modal");
const openAddUserModal = document.querySelector("#open-add-user-modal");
const closeAddUserModal = document.querySelector("#close-add-user-modal");

if (openAddUserModal) openAddUserModal.addEventListener("click", () => addUserModal.style.display = "flex");
if (closeAddUserModal) closeAddUserModal.addEventListener("click", () => addUserModal.style.display = "none");

const editUserModal = document.querySelector("#edit-user-modal");
const closeEditUserModal = document.querySelector("#close-edit-user-modal");

if (closeEditUserModal) closeEditUserModal.addEventListener("click", () => {
    closeEditUser();
    editUserModal.style.display = "none";
    showUserModal.style.display = "flex";
});

const changePasswordUserModal = document.querySelector("#change-password-user-modal");
const closeChangePasswordUserModal = document.querySelector("#close-change-password-user-modal");

if (closeChangePasswordUserModal) closeChangePasswordUserModal.addEventListener("click", () => {
    changePasswordUserModal.style.display = "none";
    showUserModal.style.display = "flex";
});

window.onclick = (event) => {
    if (event.target === showUserModal) closeUserInfo();
    if (event.target === addUserModal) addUserModal.style.display = "none";
    if (event.target === editUserModal) {
        editUserModal.style.display = "none";
        closeUserInfo();
        closeEditUser();
    }
    if (event.target === changePasswordUserModal) {
        changePasswordUserModal.style.display = "none";
        closeUserInfo();
    }
};

const addUserForm = document.querySelector("#add-user-form");
const changePasswordUserForm = document.querySelector("#change-password-user-form");

if (addUserForm) addUserForm.addEventListener("submit", addUser);
if (changePasswordUserForm) changePasswordUserForm.addEventListener("submit", changePassword);

function addUser(event) {
    event.preventDefault();

    const userData = {
        username: addUserForm["username"].value,
        password: addUserForm["password"].value,
        repeatPassword: addUserForm["repeat-password"].value,
        role: "USER",
        isActive: false,
    };

    if (userData.password !== userData.repeatPassword) {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Пароль не співпадає";
        errorMessage.className = "modal-error-message";
        addUserForm.insertBefore(errorMessage, addUserForm.firstChild);
        return false;
    }

    fetch(apiUrl + "/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then((res) => {
            if (res.status === 409) {
                const errorMessage = document.createElement("p");
                errorMessage.textContent = "Користувач с таким ім'ям вже існує";
                errorMessage.className = "modal-error-message";
                addUserForm.insertBefore(errorMessage, addUserForm.firstChild);
                return false
            }

            if (res.status === 201) location.reload();
            else console.log(res);
        })
        .catch((err) => console.log(err));
}

function changePassword(event) {
    event.preventDefault();

    const userData = {
        password: changePasswordUserForm["password"].value,
        repeatPassword: changePasswordUserForm["repeat-password"].value,
    };

    if (userData.password !== userData.repeatPassword) {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Пароль не співпадає";
        errorMessage.className = "modal-error-message";
        changePasswordUserForm.insertBefore(errorMessage, changePasswordUserForm.firstChild);
        return false;
    }

    updateUser(changePasswordUserForm["id_user"].value, userData);
}

function activateUser(userId) {
    const userData = {
        isActive: true,
    };

    updateUser(userId, userData);
}

function deactivateUser(userId) {
    const userData = {
        isActive: false,
    };

    updateUser(userId, userData);
}

function updateUser(userId, userData) {
    fetch(apiUrl + `/users/${userId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then((res) => {
            if (res.status === 409) {
                const editUserForm = document.querySelector("#edit-user-form");
                const errorMessage = document.createElement("p");
                errorMessage.textContent = "Користувач с таким ім'ям вже існує";
                errorMessage.className = "modal-error-message";
                editUserForm.insertBefore(errorMessage, editUserForm.firstChild);
                return false
            }

            if (res.status === 200) location.reload();
            else console.log(res);
        })
        .catch((err) => console.log(err));
}

function deleteUser(userId) {
    fetch(apiUrl + `/users/${userId}`, {
        method: "DELETE"
    })
        .then((res) => {
            if (res.status === 200) location.reload();
            else console.log(res);
        })
        .catch((err) => console.log(err));
}