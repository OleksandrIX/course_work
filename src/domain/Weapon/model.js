const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("Weapon", {
        id_weapon: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_weapon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        serial_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        TTX: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date_manufacture: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        serviceman_id:{
          type: DataTypes.INTEGER,
          allowNull: true,
        },
    }, {timestamps: false, freezeTableName: true});
};