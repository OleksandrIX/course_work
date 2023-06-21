const editUserButtons = document.querySelectorAll(".user-list > .list-item  .edit-icon");

editUserButtons.forEach((editButton) => {
    editButton.addEventListener("click", async (event) => {
        event.stopPropagation();
        const listItem = getListItem(event.target);
        const userId = listItem.id.split("-")[1];
        const user = await getOneUser(userId);
        if (!user) return;
        editUserForm["id"].value = user.id;
        editUserForm["username"].value = user.username;
        openEditUserModal();
    });
});

const deleteUserButtons = document.querySelectorAll(".user-list > .list-item .delete-icon");

deleteUserButtons.forEach((deleteUserButton) => {
    deleteUserButton.addEventListener("click", async (event) => {
        event.stopPropagation();
        const listItem = getListItem(event.target);
        const userId = listItem.id.split("-")[1];
        await deleteUser(userId);
    })
});

const addUserForm = document.querySelector("#add-user-form");
const editUserForm = document.querySelector("#edit-user-form");

const addUser = async (event) => {
    event.preventDefault();
    const userData = {
        username: addUserForm["username"].value,
        password: addUserForm["password"].value
    };

    await saveUser(userData);
};

const editUser = async (event) => {
    event.preventDefault();
    const {value} = editUserForm["id"];
    await updateUser(value,{username: editUserForm["username"].value});
};

addUserForm.addEventListener("submit", addUser);
editUserForm.addEventListener("submit", editUser);