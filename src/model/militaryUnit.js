const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define("military_unit", {
        nameMilitaryUnit:{type: DataTypes.STRING, allowNull: false, unique: {name: "nameMilitaryUnit"}}
    }, {timestamps: false, freezeTableName: true});
};