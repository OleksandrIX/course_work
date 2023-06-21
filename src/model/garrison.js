const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define("garrison", {
        nameGarrison:{type: DataTypes.STRING, allowNull: false, unique: {name: "nameGarrison"}},
    }, {timestamps: false, freezeTableName: true});
};