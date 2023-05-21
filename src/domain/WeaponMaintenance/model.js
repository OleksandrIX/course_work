const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("WeaponMaintenance", {
        id_maintenance: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type_maintenance: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_maintenance: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        weapon_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {timestamps: false, freezeTableName: true});
};