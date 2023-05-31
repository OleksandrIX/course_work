const showUserModal = document.getElementById("show-user-modal");
const addUserModal = document.getElementById("add-user-modal");
const editUserModal = document.getElementById("edit-user-modal");

function openAddUserModal() {
    addUserModal.style.display = "flex";
}

function openUserModal(userId) {
    fetch(api + `/users/${userId}`)
        .then((res) => {
            if (res.status === 200) return res.json();
            console.log(res);
        })
        .then(({user}) => {
            const showUserForm = document.getElementById("show-user-form");
            showUserForm["idUser"].value = user.idUser;
            showUserForm["username"].value = user.username;
            showUserForm["role"].value = user.role;

            document.querySelector(".edit-user-btn").addEventListener("click", () => {
                showUserModal.style.display = "none";

                const editUserForm = document.getElementById("edit-user-form");
                editUserForm["idUser"].value = user.idUser;
                editUserForm["username"].value = user.username;

                editUserForm.addEventListener("submit", (event) => updateUser(event, userId));

                editUserModal.style.display = "flex";
            });

            document.querySelector(".delete-user-btn").addEventListener("click", () => {
                deleteUser(userId);
            });
        })
        .catch((err) => console.log(err));
    showUserModal.style.display = "flex";
}

function closeShowUserModal() {
    showUserModal.style.display = "none";
}

function closeAddUserModal() {
    addUserModal.style.display = "none";
}

function closeEditUserModal() {
    editUserModal.style.display = "none";
}

const addUserForm = document.getElementById("add-user-form");
if (addUserForm) addUserForm.addEventListener("submit", addUser)

function addUser(event) {
    event.preventDefault();

    const userData = {
        username: addUserForm["username"].value,
        password: addUserForm["password"].value
    };

    fetch(api + "/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
        .then((res) => {
            if (res.status === 409) {
                const errorMessage = document.createElement("p");
                errorMessage.textContent = "Користувач с таким ім'ям вже існує";
                errorMessage.className = "modal-error-message";
                addUserForm.insertBefore(errorMessage, addUserForm.firstChild);
                return false;
            }

            if (res.status === 201) location.reload();
            else console.log(res);
        })
        .catch((err) => console.log(err));
}

function updateUser(event, userId) {
    event.preventDefault();

    const editUserForm = document.getElementById("edit-user-form");
    const userData = {
        username: editUserForm["username"].value
    };

    fetch(api + `/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
        .then((res) => {
            if (res.status === 409) {
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
    fetch(api + `/users/${userId}`, {
        method: "DELETE"
    })
        .then((res) => {
            if (res.status === 200) location.reload();
            else console.log(res);
        })
        .catch((err) => console.log(err));
}

window.onclick = (event) => {
    if (event.target === showUserModal) showUserModal.style.display = "none";
    if (event.target === addUserModal) addUserModal.style.display = "none";
    if (event.target === editUserModal) editUserModal.style.display = "none";
};