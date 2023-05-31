const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define("document_type", {
        idDocumentType: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        typeName: {type: DataTypes.STRING, unique: true, allowNull: false},
    }, {timestamps: false, freezeTableName: true});
};