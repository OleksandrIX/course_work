const addPersonnelModal = document.querySelector("#add-personnel-modal");
const openAddPersonnelModal = document.querySelector("#open-add-personnel-modal");
const closeAddPersonnelModal = document.querySelector("#close-add-personnel-modal");

if (openAddPersonnelModal) openAddPersonnelModal.addEventListener("click", () => addPersonnelModal.style.display = "flex");
if (closeAddPersonnelModal) closeAddPersonnelModal.addEventListener("click", () => addPersonnelModal.style.display = "none");

const editPersonnelModal = document.querySelector("#edit-personnel-modal");
const openEditPersonnelModal = document.querySelector("#open-edit-personnel-modal");
const closeEditPersonnelModal = document.querySelector("#close-edit-personnel-modal");

if (openEditPersonnelModal) openEditPersonnelModal.addEventListener("click", showEditPersonnelModal);
if (closeEditPersonnelModal) closeEditPersonnelModal.addEventListener("click", () => editPersonnelModal.style.display = "none");

function showEditPersonnelModal() {
    editPersonnelModal.style.display = "flex";
    const currentUrl = location.href.split("/");
    const personnelId = currentUrl[currentUrl.length - 1];

    fetch(apiUrl + `/personnel/${personnelId}`)
        .then((res) => {
            if (res.status === 200) return res.json();
            console.log(res);
        })
        .then(({personnel}) => {
            editPersonnelForm["id_personnel"].value = personnel.id_personnel;
            editPersonnelForm["last_name"].value = personnel.last_name;
            editPersonnelForm["first_name"].value = personnel.first_name;
            editPersonnelForm["middle_name"].value = personnel.middle_name;
            editPersonnelForm["enlistment_date"].value = personnel.enlistment_date;
            editPersonnelForm["military_rank"].value = personnel.military_rank;
            editPersonnelForm["position"].value = personnel.position;
        })
        .catch((err) => console.log(err))
}

const addPersonnelForm = document.querySelector("#add-personnel-form");
const editPersonnelForm = document.querySelector("#edit-personnel-form");

if (addPersonnelForm) addPersonnelForm.addEventListener("submit", addPersonnel);
if (editPersonnelForm) editPersonnelForm.addEventListener("submit", updatePersonnel);

function addPersonnel(event) {
    event.preventDefault();
    const currentUrl = location.href.split("/");
    const unitId = currentUrl[currentUrl.length - 1];

    const personnelData = {
        last_name: addPersonnelForm["last_name"].value,
        first_name: addPersonnelForm["first_name"].value,
        middle_name: addPersonnelForm["middle_name"].value,
        enlistment_date: addPersonnelForm["enlistment_date"].value,
        military_rank: addPersonnelForm["military_rank"].value,
        position: addPersonnelForm["position"].value,
        unit_id: unitId,
    };


    fetch(apiUrl + "/personnel", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(personnelData)
    })
        .then((res) => {
            if (res.status === 201) location.reload();
            else console.log(res);
        })
        .catch((err) => console.log(err));
}

function updatePersonnel(event) {
    event.preventDefault();

    const personnelId = editPersonnelForm["id_personnel"].value;
    const personnelData = {
        last_name: editPersonnelForm["last_name"].value,
        first_name: editPersonnelForm["first_name"].value,
        middle_name: editPersonnelForm["middle_name"].value,
        enlistment_date: editPersonnelForm["enlistment_date"].value,
        military_rank: editPersonnelForm["military_rank"].value,
        position: editPersonnelForm["position"].value,
    };

    fetch(apiUrl + `/personnel/${personnelId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(personnelData)
    })
        .then((res) => {
            if (res.status === 200) location.reload();
            else console.log(res);
        })
        .catch((err) => console.log(err));
}

function deletePersonnel(personnelId) {
    fetch(apiUrl + `/personnel/${personnelId}`, {
        method: "DELETE"
    })
        .then((res) => {
            if (res.status === 200) location.href = document.referrer;
            else console.log(res);
        })
        .catch((err) => console.log(err));
}