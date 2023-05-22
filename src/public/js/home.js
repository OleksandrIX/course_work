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

function openCompany(companyId) {
    location.href = `/home?action=companies&companyId=${companyId}`;
}

function redirectToAddWeaponPage(companyId) {
    location.href = `/home?action=add-weapon&companyId=${companyId}`;
}

function redirectToAddServicemanPage(companyId) {
    location.href = `/home?action=add-serviceman&companyId=${companyId}`;
}

function redirectToAddMaintenancePage(companyId, weaponId) {
    location.href = `/home?action=add-maintenance&companyId=${companyId}&weaponId=${weaponId}`;
}

function redirectToEditWeaponPage(companyId, weaponId) {
    location.href = `/home?action=edit-weapon&companyId=${companyId}&weaponId=${weaponId}`;
}

function redirectToEditServicemanPage(companyId, servicemanId) {
    location.href = `/home?action=edit-serviceman&companyId=${companyId}&servicemanId=${servicemanId}`;
}

function redirectToEditMaintenancePage(companyId, maintenanceId) {
    location.href = `/home?action=edit-maintenance&companyId=${companyId}&maintenanceId=${maintenanceId}`;
}

function openWeapon(companyId, weaponId) {
    location.href = `/home?action=weapon&companyId=${companyId}&weaponId=${weaponId}`;
}

function openServiceman(companyId, servicemanId) {
    location.href = `/home?action=serviceman&companyId=${companyId}&servicemanId=${servicemanId}`;
}

const addWeaponForm = document.querySelector("#weapon-add");
const addServicemanForm = document.querySelector("#serviceman-add");
const addMaintenanceForm = document.querySelector("#maintenance-add");

if (addWeaponForm) addWeaponForm.addEventListener("submit", addWeapon);
if (addServicemanForm) addServicemanForm.addEventListener("submit", addServiceman);
if (addMaintenanceForm) addMaintenanceForm.addEventListener("submit", addMaintenance);

const editWeaponForm = document.querySelector("#weapon-edit");
const editServicemanForm = document.querySelector("#serviceman-edit");
const editMaintenanceForm = document.querySelector("#maintenance-edit");

if (editWeaponForm) editWeaponForm.addEventListener("submit", editWeapon);
if (editServicemanForm) editServicemanForm.addEventListener("submit", editServiceman);
if (editMaintenanceForm) editMaintenanceForm.addEventListener("submit", editMaintenance);

function addWeapon(event) {
    event.preventDefault();

    let ttxValues = "";
    const ttxTable = document.querySelector("#list-ttx");
    const tableBody = ttxTable.getElementsByTagName("tbody")[0];
    const rows = tableBody.getElementsByTagName("tr");

    for (const row of rows) {
        const [tdProperty, tdValue, tdUnitMeasure] = row.getElementsByTagName("td");
        const ttxValue = `${tdProperty.textContent}: ${tdValue.textContent} ${tdUnitMeasure.textContent}; `;
        ttxValues += ttxValue;
    }

    const weaponData = {
        name_weapon: addWeaponForm["name_weapon"].value,
        serial_number: addWeaponForm["serial_number"].value,
        date_manufacture: addWeaponForm["date_manufacture"].value,
        serviceman_id: addWeaponForm["serviceman_id"].value,
        TTX: ttxValues,
    };

    if (!validateDate(weaponData.date_manufacture))
        alert("Ви ввели некоректну дату виготовлення!\n" +
            "Введіть дату виготовлення в такому форматі (ДД-ММ-РРРР)");
    else {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", uri + `/weapons`, true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onload = () => {
            if (xhr.status === 200) {
                location.href = document.referrer;
            } else {
                console.error(xhr.responseText);
            }
        }

        xhr.send(JSON.stringify(weaponData));
    }
}

function addServiceman(event) {
    event.preventDefault();

    const servicemanData = {
        last_name: addServicemanForm["last_name"].value,
        first_name: addServicemanForm["first_name"].value,
        middle_name: addServicemanForm["middle_name"].value,
        military_rank: addServicemanForm["military_rank"].value,
        position: addServicemanForm["position"].value,
        birth_date: addServicemanForm["birth_date"].value,
        company_id: addServicemanForm["company_id"].value,
    };

    if (!validateDate(servicemanData.birth_date))
        alert("Ви ввели некоректну дату народження!\n" +
            "Введіть дату народження в такому форматі (ДД-ММ-РРРР)");
    else {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", uri + `/servicemans`, true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onload = () => {
            if (xhr.status === 200) {
                location.href = document.referrer;
            } else {
                console.error(xhr.responseText);
            }
        }

        xhr.send(JSON.stringify(servicemanData));
    }
}

function addMaintenance(event) {
    event.preventDefault();

    const maintenanceData = {
        type_maintenance: addMaintenanceForm["type_maintenance"].value,
        date_maintenance: addMaintenanceForm["date_maintenance"].value,
        weapon_id: addMaintenanceForm["weapon_id"].value,
    };

    if (!validateDate(maintenanceData.date_maintenance))
        alert("Ви ввели некоректну дату проведення ТО!\n" +
            "Введіть дату проведення ТО в такому форматі (ДД-ММ-РРРР)");
    else {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", uri + `/maintenances`, true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onload = () => {
            if (xhr.status === 200) {
                location.href = document.referrer;
            } else {
                console.error(xhr.responseText);
            }
        }

        xhr.send(JSON.stringify(maintenanceData));
    }
}

function editWeapon(event){
    event.preventDefault();

    let ttxValues = "";
    const ttxTable = document.querySelector("#list-ttx");
    const tableBody = ttxTable.getElementsByTagName("tbody")[0];
    const rows = tableBody.getElementsByTagName("tr");

    for (const row of rows) {
        const [tdProperty, tdValue, tdUnitMeasure] = row.getElementsByTagName("td");
        const ttxValue = `${tdProperty.textContent}: ${tdValue.textContent} ${tdUnitMeasure.textContent}; `;
        ttxValues += ttxValue;
    }

    ttxValues = ttxValues.trim();

    const weaponData = {
        id_weapon: editWeaponForm["id_weapon"].value,
        name_weapon: editWeaponForm["name_weapon"].value,
        serial_number: editWeaponForm["serial_number"].value,
        date_manufacture: editWeaponForm["date_manufacture"].value,
        serviceman_id: editWeaponForm["serviceman_id"].value,
        TTX: ttxValues,
    };

    if (!validateDate(weaponData.date_manufacture))
        alert("Ви ввели некоректну дату виготовлення!\n" +
            "Введіть дату виготовлення в такому форматі (ДД-ММ-РРРР)");
    else {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uri + `/weapons/${weaponData.id_weapon}`, true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onload = () => {
            if (xhr.status === 200) {
                location.href = document.referrer;
            } else {
                console.error(xhr.responseText);
            }
        }

        xhr.send(JSON.stringify(weaponData));
    }
}

function editServiceman(event) {
    event.preventDefault();

    const servicemanData = {
        last_name: editServicemanForm["last_name"].value,
        first_name: editServicemanForm["first_name"].value,
        middle_name: editServicemanForm["middle_name"].value,
        military_rank: editServicemanForm["military_rank"].value,
        position: editServicemanForm["position"].value,
        birth_date: editServicemanForm["birth_date"].value,
        company_id: editServicemanForm["company_id"].value,
    };

    if (!validateDate(servicemanData.birth_date))
        alert("Ви ввели некоректну дату народження!\n" +
            "Введіть дату народження в такому форматі (ДД-ММ-РРРР)");
    else {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uri + `/servicemans/${editServicemanForm["id_serviceman"].value}`, true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onload = () => {
            if (xhr.status === 200) {
                location.href = `/home?action=companies&companyId=${servicemanData.company_id}`;
            } else {
                console.error(xhr.responseText);
            }
        }

        xhr.send(JSON.stringify(servicemanData));
    }
}

function editMaintenance(event) {
    event.preventDefault();

    const maintenanceData = {
        id_maintenance: editMaintenanceForm["id_maintenance"].value,
        type_maintenance: editMaintenanceForm["type_maintenance"].value,
        date_maintenance: editMaintenanceForm["date_maintenance"].value,
        weapon_id: editMaintenanceForm["weapon_id"].value,
    };

    if (!validateDate(maintenanceData.date_maintenance))
        alert("Ви ввели некоректну дату проведення ТО!\n" +
            "Введіть дату проведення ТО в такому форматі (ДД-ММ-РРРР)");
    else {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uri + `/maintenances/${maintenanceData.id_maintenance}`, true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onload = () => {
            if (xhr.status === 200) {
                location.href = document.referrer;
            } else {
                console.error(xhr.responseText);
            }
        }

        xhr.send(JSON.stringify(maintenanceData));
    }
}

function removeWeapon(companyId, weaponId) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", uri + `/weapons/${weaponId}`, true);
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            location.href = `/home?action=companies&companyId=${companyId}`;
        } else {
            console.error(xhr.responseText);
        }
    };

    xhr.send();
}

function removeServiceman(companyId, servicemanId) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", uri + `/servicemans/${servicemanId}`, true);
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            location.href = `/home?action=companies&companyId=${companyId}`;
        } else {
            console.error(xhr.responseText);
        }
    };

    xhr.send();
}

function removeMaintenance(maintenanceId) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", uri + `/maintenances/${maintenanceId}`, true);
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            location.reload();
        } else {
            console.error(xhr.responseText);
        }
    };

    xhr.send();
}

function validateDate(date) {
    const pattern = /^(\d{2})-(\d{2})-(\d{4})$/
    if (!pattern.test(date)) return false;

    let [day, month, year] = date.split("-");
    day = parseInt(day, 10);
    month = parseInt(month, 10);
    year = parseInt(year, 10);

    date = new Date(year, month - 1, day);
    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1901 || year > (new Date().getFullYear())) return false;
    return !(date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day);
}