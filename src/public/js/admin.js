const uri = "http://localhost:5555/api";

const weaponTable = document.querySelector("#weapons-table");
const servicemanTable = document.querySelector("#servicemans-table");

const weaponBtn = document.querySelector("#weapon-btn");
const servicemanBtn = document.querySelector("#serviceman-btn");

if (weaponBtn) {
    weaponBtn.addEventListener("click", () => {
        weaponTable.style.display = "block";
        servicemanTable.style.display = "none";
    });
}

if (servicemanBtn) {
    servicemanBtn.addEventListener("click", () => {
        servicemanTable.style.display = "block";
        weaponTable.style.display = "none";
    });
}

const openCompanyBtns = document.querySelectorAll(".open-company");
if (openCompanyBtns.length !== 0) {
    for (const openCompanyBtn of openCompanyBtns) {
        const [companyId, td1, td2] = openCompanyBtn.children;
        td1.addEventListener("click", () => openCompany(companyId.value))
        td2.addEventListener("click", () => openCompany(companyId.value))
    }
}

function actionsWithUsers() {
    location.href = "/admin?type=user&action=users";
}

function actionsWithCompanies() {
    location.href = "/admin?type=company&action=companies";
}

function openCompany(companyId) {
    location.href = `/admin?type=company&action=company&companyId=${companyId}`;
}

function openWeapon(companyId, weaponId) {
    location.href = `/admin?type=company&action=weapon&companyId=${companyId}&weaponId=${weaponId}`;
}

function openServiceman(companyId, servicemanId) {
    location.href = `/admin?type=company&action=serviceman&companyId=${companyId}&servicemanId=${servicemanId}`;
}

function redirectToAddWeaponPage(companyId) {
    location.href = `/admin?type=company&action=add-weapon&companyId=${companyId}`;
}

function redirectToAddServicemanPage(companyId) {
    location.href = `/admin?type=company&action=add-serviceman&companyId=${companyId}`;
}

function redirectToAddMaintenancePage(companyId, weaponId) {
    location.href = `/admin?type=company&action=add-maintenance&companyId=${companyId}&weaponId=${weaponId}`;
}

function redirectToEditWeaponPage(companyId, weaponId) {
    location.href = `/admin?type=company&action=edit-weapon&companyId=${companyId}&weaponId=${weaponId}`;
}

function redirectToEditServicemanPage(companyId, servicemanId) {
    location.href = `/admin?type=company&action=edit-serviceman&companyId=${companyId}&servicemanId=${servicemanId}`;
}

function redirectToEditMaintenancePage(companyId, maintenanceId) {
    location.href = `/admin?type=company&action=edit-maintenance&companyId=${companyId}&maintenanceId=${maintenanceId}`;
}

function redirectToAddUserPage() {
    location.href = "/admin?type=user&action=add-user";
}

function redirectToAddCompanyPage() {
    location.href = "/admin?type=company&action=add-company";
}

function redirectToEditUserPage(userId) {
    location.href = `/admin?type=user&action=edit-user&userId=${userId}`;
}

function redirectToEditCompanyPage(companyId) {
    location.href = `/admin?type=company&action=edit-company&companyId=${companyId}`;
}

const addUserForm = document.querySelector("#user-add");
const addCompanyForm = document.querySelector("#company-add");

if (addUserForm) addUserForm.addEventListener("submit", addUser);
if (addCompanyForm) addCompanyForm.addEventListener("submit", addCompany);

const editUserForm = document.querySelector("#user-edit");
const editCompanyForm = document.querySelector("#company-edit");

if (editUserForm) editUserForm.addEventListener("submit", editUser);
if (editCompanyForm) editCompanyForm.addEventListener("submit", editCompany);

function addUser(event) {
    event.preventDefault();

    const userData = {
        username: addUserForm["username"].value,
        password: addUserForm["password"].value,
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", uri + `/users`, true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onload = () => {
        if (xhr.status === 200) {
            location.href = "/admin?type=user&action=users";
        } else {
            console.error(xhr.responseText);
        }
    }

    xhr.send(JSON.stringify(userData));
}

function addCompany(event) {
    event.preventDefault();

    const companyData = {
        name_company: addCompanyForm["name_company"].value,
        user_id: addCompanyForm["user_id"].value,
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", uri + `/companies`, true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onload = () => {
        if (xhr.status === 200) {
            location.href = "/admin?type=company&action=companies";
        } else {
            console.error(xhr.responseText);
        }
    }

    xhr.send(JSON.stringify(companyData));
}

function editUser(event) {
    event.preventDefault();

    const userData = {
        username: editUserForm["username"].value,
    };

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uri + `/users/${editUserForm["id_user"].value}`, true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onload = () => {
        if (xhr.status === 200) {
            location.href = "/admin?type=user&action=users";
        } else {
            console.error(xhr.responseText);
        }
    }

    xhr.send(JSON.stringify(userData));
}

function editCompany(event) {
    event.preventDefault();

    const companyData = {
        name_company: editCompanyForm["name_company"].value,
        user_id: editCompanyForm["user_id"].value,
    };

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uri + `/companies/${editCompanyForm["id_company"].value}`, true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onload = () => {
        if (xhr.status === 200) {
            location.href = "/admin?type=company&action=companies";
        } else {
            console.error(xhr.responseText);
        }
    }

    xhr.send(JSON.stringify(companyData));
}

function removeUser(userId) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", uri + `/users/${userId}`, true);
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            location.reload();
        } else {
            console.error(xhr.responseText);
        }
    };

    xhr.send();
}

function removeCompany(companyId) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", uri + `/companies/${companyId}`, true);
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            location.reload();
        } else {
            console.error(xhr.responseText);
        }
    };

    xhr.send();
}

function validateUserForm(users) {
    const username = document.querySelector("#username").value.trim();

    for (const user of users) {
        if (user.username === username) {
            alert("Користувач з таким іменем вже є!");
            return false;
        }
    }

    return true;
}

function validateCompanyForm(companies) {
    const name_company = document.querySelector("#name_company").value.trim();
    console.log(name_company);
    for (const company of companies) {
        if (company.company.name_company === name_company) {
            alert("Рота з такою назвою вже є!");
            return false;
        }
    }

    return true;
}