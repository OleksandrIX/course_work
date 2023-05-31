const {DocumentService} = require("../../service");
const getDocuments = async (req, res) => {
    let documents;
    const {type} = req.query;
    try {
        if (type) documents = await DocumentService.getAllDocumentsByType(type);
        else documents = await DocumentService.getAllDocuments();
        res.status(200).json({documents});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const getDocument = async (req, res) => {
    const {documentId} = req.params;
    try {
        const document = await DocumentService.getDocumentById(documentId);
        if (!document) return res.status(404).json({message: "Document not found"});
        res.status(200).json({document});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const createDocument = async (req, res) => {
    const documentData = req.body;
    try {
        if (await DocumentService.isExistsByDocumentNumber(documentData.documentNumber))
            return res.status(409).json({
                message: "Document with that number already exists"
            });

        await DocumentService.createDocument(documentData);
        res.status(201).json({message: "Document created successfully"});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const updateDocument = async (req, res) => {
    const {documentId} = req.params;
    const documentData = req.body;
    try {
        const document = await DocumentService.getDocumentById(documentId);

        if (!document)
            return res.status(404).json({
                message: "Document not found"
            });

        if (documentData.documentNumber !== document.documentNumber &&
            await DocumentService.isExistsByDocumentNumber(documentData.documentNumber))
            return res.status(409).json({
                message: "Document with that number already exists"
            });

        await DocumentService.updateDocument(documentId, documentData);
        res.status(200).json({message: "Document updated successfully"});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const deleteDocument = async (req, res) => {
    const {documentId} = req.params;
    try {
        if (!await DocumentService.isExistsById(documentId))
            return res.status(404).json({
                message: "Document not found"
            });

        await DocumentService.deleteDocument(documentId);
        res.status(200).json({message: "Document deleted successfully"});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};


module.exports = {
    getDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument,
};