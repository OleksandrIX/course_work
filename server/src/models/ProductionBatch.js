const { sequelize } = require("../db/connect.db");
const { DataTypes } = require("sequelize")

module.exports = sequelize.define("productionBatch", {
    idBatch: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    serialNumberBatch: { type: DataTypes.STRING, allowNull: false, unique: { name: "serialNumberBatch" } },
    dateBatchReceipt: { type: DataTypes.DATEONLY, allowNull: false },
}, { timestamps: false, freezeTableName: true });