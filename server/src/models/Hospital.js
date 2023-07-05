const { sequelize } = require("../db/connect.db");
const { DataTypes } = require("sequelize")

module.exports = sequelize.define("hospital", {
    idHospital: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nameHospital: { type: DataTypes.STRING, allowNull: false, unique: { name: "nameHospital" } },
}, { timestamps: false, freezeTableName: true });