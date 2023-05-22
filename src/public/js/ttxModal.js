const addModal = document.querySelector("#add-ttx");
const editModal = document.querySelector("#edit-ttx");
const showModal = document.querySelector("#show-ttx");

const openAddModal = document.querySelector("#open-add-modal");
const openShowModal = document.querySelector("#open-show-modal");

const closeAddModal = document.querySelector("#close-add-modal");
const closeShowModal = document.querySelector("#close-show-modal");


if (openAddModal) openAddModal.addEventListener("click", (event) => {
    event.preventDefault();
    addModal.style.display = "block";
});

if (closeAddModal) closeAddModal.addEventListener("click", () => {
    addModal.style.display = "none";
});

if (openShowModal) openShowModal.addEventListener("click", (event) => {
    event.preventDefault();
    showModal.style.display = "block";
});

if (closeShowModal) closeShowModal.addEventListener("click", () => {
    showModal.style.display = "none";
});

window.onclick = (event) => {
    if (event.target === addModal) {
        addModal.style.display = "none";
    } else if (event.target === showModal) {
        showModal.style.display = "none";
    }
};

const addTTXForm = document.querySelector("#form-add-ttx");
const editTTXForm = document.querySelector("#form-edit-ttx");

if (addTTXForm) addTTXForm.addEventListener("submit", addTTX);
if (editTTXForm) editTTXForm.addEventListener("submit", (event) => editTTX(event));

function addTTX(event) {
    event.preventDefault();

    const propertyInput = addTTXForm["property"];
    const valueInput = addTTXForm["value"];
    const unitMeasureInput = addTTXForm["unit_measure"];

    const TTXData = {
        property: propertyInput.value.trim(),
        value: valueInput.value.trim(),
        unit_measure: unitMeasureInput.value,
    };

    const pattern = /^(\d+|\d+[.,]\d+)$/;

    if (pattern.test(TTXData.value)) {
        createTableRow(TTXData);
        propertyInput.value = "";
        valueInput.value = "";
        addModal.style.display = "none";
    } else {
        valueInput.style.borderColor = "red";
        alert("Значення має бути в такому вигляді 5.45 або 5,45)");
    }
}

function parseTTX(array) {
    const parsedArray = [];

    for (let i = 0; i < array.length; i++) {
        const characteristic = array[i];
        if (characteristic.length === 0) continue;
        const [property, value] = characteristic.split(":").map((item) => item.trim());
        const unitMeasure = value.split(" ")[1];

        parsedArray.push({property, value: value.split(" ")[0], unit_measure: unitMeasure});
    }

    return parsedArray;
}

function addTTXsInTable(TTXs) {
    TTXs = TTXs.trim();
    TTXs = parseTTX(TTXs.split(";"));
    for (const ttx of TTXs) {
        const TTXData = {
            property: ttx.property,
            value: ttx.value,
            unit_measure: ttx.unit_measure,
        };

        createTableRow(TTXData);
    }
}

function editTTX(event) {
    event.preventDefault();

    const propertyInput = editTTXForm["property"];
    const valueInput = editTTXForm["value"];
    const unitMeasureInput = editTTXForm["unit_measure"];

    const TTXData = {
        property: propertyInput.value.trim(),
        value: valueInput.value.trim(),
        unit_measure: unitMeasureInput.value,
    };

    const pattern = /^(\d+|\d+[.,]\d+)$/;

    if (pattern.test(TTXData.value)) {
        createTableRow(TTXData);
        propertyInput.value = "";
        valueInput.value = "";
        editModal.style.display = "none";
        showModal.style.display = "block";
    } else {
        valueInput.style.borderColor = "red";
        alert("Значення має бути в такому вигляді 5.45 або 5,45)");
    }
}

function openEditTTX(btn) {
    if (showModal) showModal.style.display = "none";

    const tr = btn.parentNode.parentNode.parentNode;
    const [tdProperty, tdValue, tdUnitMeasure] = tr.children;
    editTTXForm["property"].value = tdProperty.textContent;
    editTTXForm["value"].value = tdValue.textContent;
    editTTXForm["unit_measure"].value = tdUnitMeasure.textContent;

    const tbody = tr.parentNode;
    tbody.removeChild(tr);

    editModal.style.display = "block";
}

function deleteTTX(btn) {
    const tr = btn.parentNode.parentNode.parentNode;
    const tbody = tr.parentNode;
    tbody.removeChild(tr);
}

function createTableRow(TTXData) {
    const bodyTableTTX = document.querySelector("#tbody-ttx");

    const tr = document.createElement("tr");

    const tdProperty = document.createElement("td");
    tdProperty.className = "table-body-item";
    tdProperty.textContent = TTXData.property;

    const tdValue = document.createElement("td");
    tdValue.className = "table-body-item";
    tdValue.textContent = TTXData.value;

    const tdUnitMeasure = document.createElement("td");
    tdUnitMeasure.className = "table-body-item";
    tdUnitMeasure.textContent = TTXData.unit_measure;

    const tdActions = document.createElement("td");
    tdActions.className = "table-body-item";

    const divActions = document.createElement("div");
    divActions.className = "actions";

    const buttonEdit = createEditBtn();
    const buttonDelete = createDeleteBtn();

    buttonEdit.addEventListener("click", () => openEditTTX(buttonEdit));
    buttonDelete.addEventListener("click", () => deleteTTX(buttonDelete));

    divActions.appendChild(buttonEdit);
    divActions.appendChild(buttonDelete);

    tdActions.appendChild(divActions);

    tr.appendChild(tdProperty);
    tr.appendChild(tdValue);
    tr.appendChild(tdUnitMeasure);
    tr.appendChild(tdActions);

    bodyTableTTX.appendChild(tr);
}

function createEditBtn() {
    const buttonEdit = document.createElement("button");
    buttonEdit.className = "action edit";

    const svgNamespace = "http://www.w3.org/2000/svg";

    const svgElement = document.createElementNS(svgNamespace, "svg");

    svgElement.setAttribute("xmlns", svgNamespace);
    svgElement.setAttribute("width", "40px");
    svgElement.setAttribute("height", "40px");
    svgElement.setAttribute("viewBox", "0 0 24 24");
    svgElement.setAttribute("fill", "white");

    const pathElement = document.createElementNS(svgNamespace, "path");

    pathElement.setAttribute("d", "M12 8.00012L4 16.0001V20.0001L8 20.0001L16 12.0001M12 " +
        "8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 " +
        "4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 " +
        "6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 " +
        "8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 " +
        "12.0001");
    pathElement.setAttribute("stroke", "orange");
    pathElement.setAttribute("stroke-width", "2");
    pathElement.setAttribute("stroke-linecap", "round");
    pathElement.setAttribute("stroke-linejoin", "round");

    svgElement.appendChild(pathElement);
    buttonEdit.appendChild(svgElement);

    return buttonEdit;
}

function createDeleteBtn() {
    const buttonDelete = document.createElement("button");
    buttonDelete.className = "action delete";

    const svgNamespace = "http://www.w3.org/2000/svg";

    const svgElement = document.createElementNS(svgNamespace, "svg");

    svgElement.setAttribute("xmlns", svgNamespace);
    svgElement.setAttribute("fill", "red");
    svgElement.setAttribute("width", "40px");
    svgElement.setAttribute("height", "40px");
    svgElement.setAttribute("viewBox", "0 0 32 32");

    const pathElement = document.createElementNS(svgNamespace, "path");

    pathElement.setAttribute("d", "M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3" +
        ",23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5 c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7," +
        "9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4 C8,24.8,8.5,25," +
        "9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z");

    svgElement.appendChild(pathElement);
    buttonDelete.appendChild(svgElement);

    return buttonDelete;
}