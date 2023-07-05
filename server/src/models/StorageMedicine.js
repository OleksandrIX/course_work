const { sequelize } = require("../db/connect.db");
const { DataTypes } = require("sequelize")

module.exports = sequelize.define("storage_medicine", {
    idStorage: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    medicineQuantity: { type: DataTypes.INTEGER, allowNull: false },
    deliveryDate: { type: DataTypes.DATEONLY, allowNull: false },
}, { timestamps: false, freezeTableName: true });