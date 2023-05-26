const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define("personnel", {
        id_personnel: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        middle_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        enlistment_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        military_rank:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        position:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        unit_commander_id:{
            type: DataTypes.INTEGER,
            onDelete: "CASCADE",
        },
        unit_id:{
            type: DataTypes.INTEGER,
            onDelete: "CASCADE",
        },
    }, {timestamps: false, freezeTableName: true});
};