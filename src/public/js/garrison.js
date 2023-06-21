const garrisonsList = document.querySelector(".garrison-list");
const garrisons = garrisonsList.children;

for (const garrison of garrisons) {
    garrison.addEventListener('click', function () {
        const militaryUnits = this.querySelector('.military-units');
        militaryUnits.classList.toggle('selected');
    });
}

const showGarrisonButtons = document.querySelectorAll(".garrison-list > .list-item > .military-units .show-icon");

showGarrisonButtons.forEach((showButton) => {
    showButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const listItem = getListItem(event.target);
        const garrisonId = listItem.id.split("-")[1];
        location.href = "/garrisons/" + garrisonId;
    });
});

const editGarrisonButtons = document.querySelectorAll(".garrison-list > .list-item  .edit-icon");

editGarrisonButtons.forEach((editButton) => {
    editButton.addEventListener("click", async (event) => {
        event.stopPropagation();
        const listItem = getListItem(event.target);
        const garrisonId = listItem.id.split("-")[1];
        const garrison = await getOneGarrison(garrisonId);
        const users = await getAllUsers();
        const selectUser = editGarrisonForm["userId"];
        selectUser.innerHTML = "";
        for (const user of users) {
            const optionUser = document.createElement("option");
            optionUser.value = user.id;
            optionUser.textContent = user.username;
            selectUser.appendChild(optionUser);
        }
        if (!garrison) return;
        editGarrisonForm["id"].value = garrison.id;
        editGarrisonForm["nameGarrison"].value = garrison.nameGarrison;
        selectUser.value = garrison.userId;
        openEditGarrisonModal();
    });
});

const deleteGarrisonButtons = document.querySelectorAll(".garrison-list > .list-item .delete-icon");

deleteGarrisonButtons.forEach((deleteGarrisonButton) => {
    deleteGarrisonButton.addEventListener("click", async (event) => {
        event.stopPropagation();
        const listItem = getListItem(event.target);
        const garrisonId = listItem.id.split("-")[1];
        await deleteGarrison(garrisonId);
    })
});

const addGarrisonForm = document.querySelector("#add-garrison-form");
const editGarrisonForm = document.querySelector("#edit-garrison-form");

const addGarrison = async (event) => {
    event.preventDefault();
    const garrisonData = {
        nameGarrison: addGarrisonForm["nameGarrison"].value,
        userId: addGarrisonForm["userId"].value
    };

    await saveGarrison(garrisonData);
};

const editGarrison = async (event) => {
    event.preventDefault();
    const {value} = editGarrisonForm["id"];
    const garrisonData = {
        nameGarrison: editGarrisonForm["nameGarrison"].value,
        userId: editGarrisonForm["userId"].value
    };

    await updateGarrison(value, garrisonData);
};

addGarrisonForm.addEventListener("submit", addGarrison);
editGarrisonForm.addEventListener("submit", editGarrison);