const documentContainer = document.querySelector(".document-container");
if (documentContainer)
    window.onload = async () => {
        const url = location.href.split("/");
        const documentId = url[url.length - 1];
        const documentData = await getDocument(documentId);
        documentData.documentType = documentData.document_type.typeName;
        renderDocument(documentData);
    };

function renderDocument(documentData) {
    const contents = document.getElementsByClassName('document-content');
    const maxHeight = 970;

    createHeader(contents[0], {
        institutionName: documentData.institutionName,
        documentNumber: documentData.documentNumber,
        documentDate: documentData.documentDate,
        titleDocument: documentData.titleDocument,
        documentType: documentData.documentType,
    });

    createBody(contents[0], {
        textDocument: documentData.textDocument
    });

    for (const content of contents) {
        if (content.offsetHeight > maxHeight) {
            const textDocumentContainer = content.querySelector(".text-document-container");
            const text = textDocumentContainer.textContent;
            const cutoffIndex = findCutoffIndex(content, textDocumentContainer, text, maxHeight);
            textDocumentContainer.innerText = text.slice(0, cutoffIndex);
            createNewPage(text.slice(cutoffIndex));
        }
    }

    createFooter(contents[contents.length - 1], {
        signature: documentData.signature,
        signatureDate: documentData.signatureDate
    });
}

function createNewPage(text) {
    const newPage = document.createElement('div');
    newPage.classList.add("document-page");
    const content = document.createElement("div");
    content.className = "document-content";

    createBody(content, {textDocument: text})

    newPage.appendChild(content);
    documentContainer.appendChild(newPage);
}

function findCutoffIndex(content, textContainer, text, maxHeight) {
    let startIndex = 0;
    let endIndex = text.length - 1;
    let cutoffIndex = endIndex;

    while (startIndex <= endIndex) {
        let middleIndex = Math.floor((startIndex + endIndex) / 2);
        textContainer.innerText = text.slice(0, middleIndex);
        if (content.offsetHeight <= maxHeight) {
            cutoffIndex = middleIndex;
            startIndex = middleIndex + 1;
        } else {
            endIndex = middleIndex - 1;
        }
    }

    return cutoffIndex;
}

function createHeader(content, header) {
    const headerContainer = document.createElement("div");
    headerContainer.className = "header-container";

    const institutionNameElement = document.createElement("h1");
    institutionNameElement.className = "institution-name";
    institutionNameElement.textContent = header.institutionName;
    const documentTypeElement = document.createElement("h2");
    documentTypeElement.className = "document-type";
    documentTypeElement.textContent = header.documentType;

    const dateNumberContainer = document.createElement("div");
    dateNumberContainer.className = "date-number-container";
    const documentDateElement = document.createElement("span");
    documentDateElement.className = "document-date";
    documentDateElement.innerText = header.documentDate;
    const documentNumberElement = document.createElement("h3");
    documentNumberElement.className = "document-number";
    documentNumberElement.innerText = header.documentNumber;
    dateNumberContainer.appendChild(documentDateElement);
    dateNumberContainer.appendChild(documentNumberElement);

    const titleDocumentElement = document.createElement("h1");
    titleDocumentElement.className = "title-document";
    titleDocumentElement.innerText = header.titleDocument;

    headerContainer.appendChild(institutionNameElement);
    headerContainer.appendChild(documentTypeElement);
    headerContainer.appendChild(dateNumberContainer);
    headerContainer.appendChild(titleDocumentElement);

    content.insertBefore(headerContainer, content.firstChild);
}

function createBody(content, body) {
    const textDocumentContainer = document.createElement("div");
    textDocumentContainer.className = "text-document-container";
    const textDocumentElement = document.createElement("p");
    textDocumentElement.className = "text-document";
    textDocumentElement.innerText = body.textDocument;
    textDocumentContainer.appendChild(textDocumentElement);

    content.appendChild(textDocumentContainer)
}

function createFooter(content, footer) {
    const footerContainer = document.createElement("div");
    footerContainer.className = "footer-container";

    const signatureContainer = document.createElement("div");
    signatureContainer.className = "signature-container";
    const signatureDateElement = document.createElement("span");
    signatureDateElement.className = "signature-date";
    signatureDateElement.innerText = footer.signatureDate;
    const signatureElement = document.createElement("h3");
    signatureElement.className = "signature";
    signatureElement.innerText = footer.signature;

    signatureContainer.appendChild(signatureDateElement);
    signatureContainer.appendChild(signatureElement);

    footerContainer.appendChild(signatureContainer);

    content.appendChild(footerContainer);
}

async function getDocument(documentId) {
    try {
        const res = await fetch(api + `/documents/${documentId}`);
        if (res.status === 200) return (await res.json()).document;
        else console.log(res)
    } catch (err) {
        console.log(err);
    }
}

const addDocumentModal = document.getElementById("add-document-modal");
const editDocumentModal = document.getElementById("edit-document-modal");

function openAddDocumentModal() {
    addDocumentModal.style.display = "flex";
}

function openEditDocumentModal() {
    editDocumentForm["institutionName"].value = document.querySelector(".institution-name").textContent;
    editDocumentForm["documentNumber"].value = document.querySelector(".document-number").textContent;
    editDocumentForm["documentDate"].value = document.querySelector(".document-date").textContent;
    editDocumentForm["titleDocument"].value = document.querySelector(".title-document").textContent;
    editDocumentForm["signature"].value = document.querySelector(".signature").textContent;
    editDocumentForm["signatureDate"].value = document.querySelector(".signature-date").textContent;
    editDocumentForm["documentType"].value = document.querySelector(".document-type").textContent;

    const textDocumentContainers = document.querySelectorAll(".text-document-container");
    editDocumentForm["textDocument"].value = Array.from(textDocumentContainers).map(text => text.textContent).join("");

    editDocumentModal.style.display = "flex";
}

function closeAddDocumentModal() {
    addDocumentModal.style.display = "none";
}

function closeEditDocumentModal() {
    editDocumentModal.style.display = "none";
}

function clearDocument() {
    const documentContainer = document.querySelector(".document-container");
    documentContainer.innerHTML = "";

    const documentPage = document.createElement("div");
    documentPage.className = "document-page";
    const documentContent = document.createElement("div");
    documentContent.className = "document-content";
    documentPage.appendChild(documentContent);

    documentContainer.appendChild(documentPage);
}

const addDocumentForm = document.getElementById("add-document-form");
const editDocumentForm = document.getElementById("edit-document-form");
if (addDocumentForm) addDocumentForm.addEventListener("submit", addDocument);
if (editDocumentForm) editDocumentForm.addEventListener("submit", editDocument);

function addDocument(event) {
    event.preventDefault();

    const documentData = {
        institutionName: addDocumentForm["institutionName"].value,
        documentNumber: addDocumentForm["documentNumber"].value,
        documentDate: addDocumentForm["documentDate"].value,
        titleDocument: addDocumentForm["titleDocument"].value,
        signature: addDocumentForm["signature"].value,
        signatureDate: addDocumentForm["signatureDate"].value,
        documentType: addDocumentForm["documentType"].value,
        textDocument: addDocumentForm["textDocument"].value
    };

    fetch(api + "/documents", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(documentData)
    })
        .then((res) => {
            if (res.status === 409) {
                const errorMessage = document.createElement("p");
                errorMessage.textContent = "Документ з таким номером вже існує";
                errorMessage.className = "modal-error-message";
                addDocumentForm.insertBefore(errorMessage, addDocumentForm.firstChild);
                return false;
            }

            if (res.status === 201) location.reload();
            else console.log(res);
        })
        .catch((err) => console.log(err));
}

function editDocument(event) {
    event.preventDefault();

    const documentData = {
        institutionName: editDocumentForm["institutionName"].value,
        documentNumber: editDocumentForm["documentNumber"].value,
        documentDate: editDocumentForm["documentDate"].value,
        titleDocument: editDocumentForm["titleDocument"].value,
        signature: editDocumentForm["signature"].value,
        signatureDate: editDocumentForm["signatureDate"].value,
        documentType: editDocumentForm["documentType"].value,
        textDocument: editDocumentForm["textDocument"].value
    };

    clearDocument();
    renderDocument(documentData);
    closeEditDocumentModal();
}

function saveDocument(documentId) {
    const documentData = {
        institutionName: editDocumentForm["institutionName"].value,
        documentNumber: editDocumentForm["documentNumber"].value,
        documentDate: editDocumentForm["documentDate"].value,
        titleDocument: editDocumentForm["titleDocument"].value,
        signature: editDocumentForm["signature"].value,
        signatureDate: editDocumentForm["signatureDate"].value,
        documentType: editDocumentForm["documentType"].value,
        textDocument: editDocumentForm["textDocument"].value
    };

    if (documentData.documentNumber !== "")
        fetch(api + `/documents/${documentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(documentData)
        })
            .then((res) => {
                const mainContainer = document.querySelector(".main-container");
                let message = document.querySelector(".message");
                if (!message) message = document.createElement("p");
                if (res.status === 409) {
                    message.textContent = "Вже існує документ з таким номером";
                    message.className = "message error";
                    mainContainer.insertBefore(message, mainContainer.firstChild);
                } else if (res.status === 200) {
                    message.textContent = "Документ збережено";
                    message.className = "message success";
                    mainContainer.insertBefore(message, mainContainer.firstChild);
                } else console.log(res);
            })
            .catch((err) => console.log(err));
}

function deleteDocument(documentId) {
    fetch(api + `/documents/${documentId}`, {
        method: "DELETE"
    })
        .then((res) => {
            if (res.status === 200) location.href = document.referrer;
            else console.log(res);
        })
        .catch((err) => console.log(err));
}

window.onclick = (event) => {
    if (event.target === addDocumentModal) addDocumentModal.style.display = "none";
    if (event.target === editDocumentModal) editDocumentModal.style.display = "none";
};