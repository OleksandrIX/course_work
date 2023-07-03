const { sequelize } = require("../db/connect.db");
const { DataTypes } = require("sequelize")

module.exports = sequelize.define("address", {
    idAddress: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    city: { type: DataTypes.STRING, allowNull: false },
    street: { type: DataTypes.STRING, allowNull: false },
    numberStreet: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false, freezeTableName: true });