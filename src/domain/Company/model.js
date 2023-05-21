const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("Company", {
        id_company: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_company: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {timestamps: false, freezeTableName: true});
};