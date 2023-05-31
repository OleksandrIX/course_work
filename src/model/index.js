const {Sequelize} = require("sequelize");
const db = require("../config/db.config");
const {createAdmin, createDocumentType} = require("../util/database");

const sequelize = new Sequelize(db.database, db.username, db.password, db.options);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connect successful");
    } catch (error) {
        console.log("Error: ", error);
    }
})();

const User = require("./user")(sequelize);
const Document = require("./document")(sequelize);
const DocumentType = require("./documentType")(sequelize);

DocumentType.hasOne(Document, {foreignKey: "documentType"});
Document.belongsTo(DocumentType, {foreignKey: "documentType"});

(async () => {
    try {
        await sequelize.sync();
        console.log("DB re-sync");

        await createAdmin(User);
        await createDocumentType(DocumentType);
    } catch (error) {
        console.log("Error: ", error);
    }
})();

module.exports = {
    User,
    Document,
    DocumentType,
};