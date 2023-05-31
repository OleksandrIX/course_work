const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define("document", {
        idDocument: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        institutionName: {type: DataTypes.STRING, allowNull: false},
        documentNumber: {type: DataTypes.STRING, unique: true, allowNull: false},
        documentDate: {type: DataTypes.DATEONLY, allowNull: false},
        titleDocument: {type: DataTypes.STRING, allowNull: false},
        textDocument: {type: DataTypes.TEXT, allowNull: false},
        signature: {type: DataTypes.STRING, allowNull: false},
        signatureDate: {type: DataTypes.DATEONLY, allowNull: false},
    }, {timestamps: false, freezeTableName: true});
};