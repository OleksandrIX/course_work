const addUnitModal = document.querySelector("#add-unit-modal");
const openAddUnitModal = document.querySelector("#open-add-unit-modal");
const closeAddUnitModal = document.querySelector("#close-add-unit-modal");

if(openAddUnitModal) openAddUnitModal.addEventListener("click", ()=>addUnitModal.style.display = "flex");
if(closeAddUnitModal) closeAddUnitModal.addEventListener("click", ()=>addUnitModal.style.display = "none");

const editUnitModal = document.querySelector("#edit-unit-modal");
const openEditUnitModal = document.querySelectorAll(".open-edit-unit-modal");
const closeEditUnitModal = document.querySelector("#close-edit-unit-modal");

if (openEditUnitModal.length !== 0) {
    for (let i = 0; i < openEditUnitModal.length; i++) {
        openEditUnitModal[i].addEventListener("click", openEditModal);
    }
}

if (closeEditUnitModal) closeEditUnitModal.addEventListener("click", () => editUnitModal.style.display = "none");

function openEditModal(event) {
    editUnitModal.style.display = "flex";
    const unitId = event.target.children[0].value;

    fetch(apiUrl + `/units/${unitId}`)
        .then((res) => {
            if (res.status === 200) return res.json();
            console.log(res);
        })
        .then(({unit}) => {
            editUnitForm["id_unit"].value = unit.id_unit;
            editUnitForm["name_unit"].value = unit.name_unit;
        })
        .catch((err) => console.log(err));
}

window.onclick = (event) => {
    if (event.target === editUnitModal) editUnitModal.style.display = "none";
    if (event.target === addUnitModal) addUnitModal.style.display = "none";
};

const addUnitForm = document.querySelector("#add-unit-form");
const editUnitForm = document.querySelector("#edit-unit-form");
const deleteUnitBtn = document.querySelector("#delete-unit");

if(addUnitForm) addUnitForm.addEventListener("submit", addUnit);
if(editUnitForm) editUnitForm.addEventListener("submit", updateUnit);
if(deleteUnitBtn) deleteUnitBtn.addEventListener("click", deleteUnit);

function addUnit(event){
    event.preventDefault();

    const unitData = {
        name_unit: addUnitForm["name_unit"].value,
    };

    fetch(apiUrl + "/units", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(unitData)
    })
        .then((res) => {
            if (res.status === 201) return res.json();
            else console.log(res);
        })
        .then(({unit})=>{
            const commanderData = {
                last_name: addUnitForm["last_name"].value,
                first_name: addUnitForm["first_name"].value,
                middle_name: addUnitForm["middle_name"].value,
                enlistment_date: addUnitForm["enlistment_date"].value,
                military_rank: addUnitForm["military_rank"].value,
                position: addUnitForm["position"].value,
                unit_commander_id: unit.id_unit,
                unit_id: unit.id_unit,
            };

            fetch(apiUrl + "/personnel", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commanderData)
            })
                .then((res) => {
                    if (res.status === 201) location.reload();
                    else console.log(res);
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
}

function updateUnit(event){
    event.preventDefault();

    const unitId = editUnitForm["id_unit"].value;
    const unitData = {
        name_unit: editUnitForm["name_unit"].value,
    };

    fetch(apiUrl + `/units/${unitId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(unitData)
    })
        .then((res) => {
            if (res.status === 200) location.reload();
            else console.log(res);
        })
        .catch((err) => console.log(err));
}

function deleteUnit(event){
    event.preventDefault();

    const unitId = editUnitForm["id_unit"].value;
    fetch(apiUrl + `/units/${unitId}`, {
        method: "DELETE"
    })
        .then((res) => {
            if (res.status === 200) location.reload();
            else console.log(res);
        })
        .catch((err) => console.log(err));
}