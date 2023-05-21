const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("Serviceman", {
        id_serviceman: {
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
        birth_date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        military_rank: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {timestamps: false, freezeTableName: true});
};