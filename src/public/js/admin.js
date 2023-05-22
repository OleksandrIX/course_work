const uri = "http://localhost:5555/api";

const userAddForm = document.querySelector("#user-add");
const companyAddForm = document.querySelector("#company-add");
const userEditForm = document.querySelector("#user-edit");
const companyEditForm = document.querySelector("#company-edit");

if (userAddForm) userAddForm.addEventListener("submit", addUser);
if (companyAddForm) companyAddForm.addEventListener("submit", addCompany);
if (userEditForm) userEditForm.addEventListener("submit", editUser);
if (companyEditForm) companyEditForm.addEventListener("submit", editCompany);

function actionsWithUsers() {
    location.href = "/admin?type=user&action=users";
}

function actionsWithCompanies() {
    location.href = "/admin?type=company&action=companies";
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

function addUser(event) {
    event.preventDefault();

    const userData = {
        username: userAddForm["username"].value,
        password: userAddForm["password"].value,
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
        name_company: companyAddForm["name_company"].value,
        user_id: companyAddForm["user_id"].value,
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
        username: userEditForm["username"].value,
    };

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uri + `/users/${userEditForm["id_user"].value}`, true);
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
        name_company: companyEditForm["name_company"].value,
        user_id: companyEditForm["user_id"].value,
    };

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uri + `/companies/${companyEditForm["id_company"].value}`, true);
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