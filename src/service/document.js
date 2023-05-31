module.exports = ({Document, DocumentType}) => {
    const getDocumentById = (idDocument) => {
        return Document.findOne({where: {idDocument}, include: DocumentType});
    };

    const getAllDocumentsByType = (type) => {
        return Document.findAll({where: {documentType: type}});
    };

    const getAllDocuments = () => {
        return Document.findAll();
    };

    const createDocument = async (documentData) => {
        if (documentData.documentType)
            documentData.documentType = await getIdDocumentType(documentData.documentType);
        return Document.create(documentData);
    };

    const updateDocument = async (idDocument, documentData) => {
        if (documentData.documentType)
            documentData.documentType = await getIdDocumentType(documentData.documentType);
        return Document.update(
            documentData,
            {where: {idDocument}},
        );
    }

    const deleteDocument = (idDocument) => {
        return Document.destroy({where: {idDocument}});
    };

    const isExistsByDocumentNumber = async (documentNumber) => {
        const document = await Document.findOne({where: {documentNumber}});
        return !!document;
    };

    const isExistsById = async (idDocument) => {
        const document = await Document.findOne({where: {idDocument}});
        return !!document;
    };

    const getIdDocumentType = async (typeName) => {
        return (await DocumentType.findOne({where: {typeName}})).idDocumentType;
    };

    return {
        getDocumentById,
        getAllDocuments,
        getAllDocumentsByType,
        createDocument,
        updateDocument,
        deleteDocument,
        isExistsByDocumentNumber,
        isExistsById,
    };
};