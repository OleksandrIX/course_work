const {sequelize} = require("../db/connect.db");
const {DataTypes} = require("sequelize")

module.exports = sequelize.define("user", {
    username: {type: DataTypes.STRING, unique: {name: "username"}, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: "USER"},
}, {timestamps: false, freezeTableName: false});