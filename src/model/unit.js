const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define("unit", {
        unitName: {type: DataTypes.STRING, allowNull: false},
    }, {timestamps: false, freezeTableName: true});
};