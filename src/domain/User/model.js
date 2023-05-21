const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("User", {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "USER",
        }
    }, {timestamps: false, freezeTableName: true});
};