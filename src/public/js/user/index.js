const apiUrl = "http://localhost:4444/api";

function openUnit(unitId){
    location.href = `/units/${unitId}`;
}
function openSalariesOfPersonnel(personnelId){
    location.href += `/personnel/${personnelId}`;
}

function backToHomePage(){
    location.href = document.referrer;
}

function backToUnitPage(){
    location.href = document.referrer;
}

window.onclick = (event) => {
    if (event.target === addPersonnelModal) addPersonnelModal.style.display = "none";
    if (event.target === editPersonnelModal) editPersonnelModal.style.display = "none";
    if (event.target === addSalaryModal) addSalaryModal.style.display = "none";
    if (event.target === editSalaryModal) editSalaryModal.style.display = "none";
};