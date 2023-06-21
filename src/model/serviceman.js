const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define("serviceman", {
        lastName: {type: DataTypes.STRING, allowNull: false},
        firstName: {type: DataTypes.STRING, allowNull: false},
        middleName: {type: DataTypes.STRING, allowNull: false},
        militaryRank: {type: DataTypes.STRING, allowNull: false},
        position: {type: DataTypes.STRING, allowNull: false},
    }, {timestamps: false, freezeTableName: true});
};