const { sequelize } = require("../db/connect.db");
const { DataTypes } = require("sequelize")

module.exports = sequelize.define("medicine", {
    idMedicine: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    medicineName: { type: DataTypes.STRING, allowNull: false, unique: { name: "medicineName" } },
    unitName: { type: DataTypes.STRING, allowNull: false },
    expirationDate: { type: DataTypes.STRING, allowNull: false },
    indications: { type: DataTypes.TEXT, allowNull: false },
    contraindications: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    instruction: { type: DataTypes.TEXT, allowNull: false },
}, { timestamps: false, freezeTableName: true });