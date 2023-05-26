const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define("units", {
        id_unit: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_unit: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    }, {timestamps: false, freezeTableName: true});
};