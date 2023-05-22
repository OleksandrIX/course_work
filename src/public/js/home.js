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

function openWeapon(companyId, weaponId) {
    location.href = `/home?action=weapon&companyId=${companyId}&weaponId=${weaponId}`;
}

function openServiceman(companyId, servicemanId) {
    location.href = `/home?action=serviceman&companyId=${companyId}&servicemanId=${servicemanId}`;
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