const addSalaryModal = document.querySelector("#add-salary-modal");
const openAddSalaryModal = document.querySelector("#open-add-salary-modal");
const closeAddSalaryModal = document.querySelector("#close-add-salary-modal");

if (openAddSalaryModal) openAddSalaryModal.addEventListener("click", () => addSalaryModal.style.display = "flex");
if (closeAddSalaryModal) closeAddSalaryModal.addEventListener("click", () => addSalaryModal.style.display = "none");

const editSalaryModal = document.querySelector("#edit-salary-modal");
const openEditSalaryModal = document.querySelectorAll(".open-edit-salary-modal");
const closeEditSalaryModal = document.querySelector("#close-edit-salary-modal");

if (openEditSalaryModal.length !== 0) {
    for (let i = 0; i < openEditSalaryModal.length; i++) {
        openEditSalaryModal[i].addEventListener("dblclick", openEditModal);
    }
}

function openEditModal(event) {
    editSalaryModal.style.display = "flex";
    const salaryId = event.target.parentElement.children[0].value;

    fetch(apiUrl + `/salaries/${salaryId}`)
        .then((res) => {
            if (res.status === 200) return res.json();
            console.log(res);
        })
        .then(({salary}) => {
            editSalaryForm["id_salary"].value = salary.id_salary;
            editSalaryForm["salary_date"].value = salary.salary_date;
            editSalaryForm["amount"].value = salary.amount;
        })
        .catch((err) => console.log(err));
}

if (closeEditSalaryModal) closeEditSalaryModal.addEventListener("click", () => editSalaryModal.style.display = "none");

const addSalaryForm = document.querySelector("#add-salary-form");
const editSalaryForm = document.querySelector("#edit-salary-form");

if (addSalaryForm) addSalaryModal.addEventListener("submit", addSalary);
if(editSalaryForm) editSalaryForm.addEventListener("submit", updateSalary);

const deleteSalaryBtn = document.querySelector("#delete-salary");
if(deleteSalaryBtn) deleteSalaryBtn.addEventListener("click", deleteSalary);

function addSalary(event) {
    event.preventDefault();
    const currentUrl = location.href.split("/");
    const personnelId = currentUrl[currentUrl.length - 1];

    const salaryData = {
        salary_date: addSalaryForm["salary_date"].value,
        amount: addSalaryForm["amount"].value,
        personnel_id: personnelId,
    };


    fetch(apiUrl + "/salaries", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(salaryData)
    })
        .then((res) => {
            if (res.status === 201) location.reload();
            else console.log(res);
        })
        .catch((err) => console.log(err));
}

function updateSalary(event){
    event.preventDefault();

    const salaryId = editSalaryForm["id_salary"].value;
    const salaryData = {
        salary_date: editSalaryForm["salary_date"].value,
        amount: editSalaryForm["amount"].value,
    };

    fetch(apiUrl + `/salaries/${salaryId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(salaryData)
    })
        .then((res) => {
            if (res.status === 200) location.reload();
            else console.log(res);
        })
        .catch((err) => console.log(err));
}

function deleteSalary(event){
    event.preventDefault();

    const salaryId = editSalaryForm["id_salary"].value;
    fetch(apiUrl + `/salaries/${salaryId}`, {
        method: "DELETE"
    })
        .then((res) => {
            if (res.status === 200) location.reload();
            else console.log(res);
        })
        .catch((err) => console.log(err));
}