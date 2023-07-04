const { sequelize } = require("../db/connect.db");
const { DataTypes } = require("sequelize")

module.exports = sequelize.define("medicineInBatch", {
    idMedicineInBatch: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    serialNumberMedicine: { type: DataTypes.STRING, allowNull: false, unique: { name: "serialNumberMedicine" } },
    productionDate: { type: DataTypes.DATEONLY, allowNull: false },
    producer: { type: DataTypes.STRING, allowNull: false },
    medicineQuantity: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: false, freezeTableName: true });