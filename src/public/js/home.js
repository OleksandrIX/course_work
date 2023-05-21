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
const addServicemanForm = document.querySelector("#serviceman-add");
const addWeaponForm = document.querySelector("#weapon-add");

if (addServicemanForm) addServicemanForm.addEventListener("submit", addServiceman);
if (addWeaponForm) addWeaponForm.addEventListener("submit", addWeapon);

function openCompany(companyId) {
    location.href = `/home?action=companies&companyId=${companyId}`;
}

function redirectToAddWeaponPage(companyId) {
    location.href = `/home?action=add-weapon&companyId=${companyId}`;
}

function redirectToAddServicemanPage(companyId) {
    location.href = `/home?action=add-serviceman&companyId=${companyId}`;
}

function redirectToEditWeaponPage(weaponId) {
    location.href = `/home?action=edit-weapon&weaponId=${weaponId}`;
}

function redirectToEditServicemanPage(servicemanId) {
    location.href = `/home?action=edit-serviceman&servicemanId=${servicemanId}`;
}

function openWeapon(companyId, weaponId) {
    location.href = `/home?action=weapon&companyId=${companyId}&weaponId=${weaponId}`;
}

function openServiceman(companyId, servicemanId) {
    location.href = `/home?action=serviceman&weaponId=${companyId}&servicemanId=${servicemanId}`;
}

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

function removeWeapon(companyId, weaponId) {
    console.log(weaponId)
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", uri + `/weapons/${weaponId}`, true);
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            location.href = `/home?action=companies&companyId=${companyId}`
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
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1901 || year > (new Date().getFullYear() - 17)) return false;
    return !(date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day);
}