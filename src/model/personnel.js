const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define("personnel", {
        lastName: {type: DataTypes.STRING, allowNull: false},
        firstName: {type: DataTypes.STRING, allowNull: false},
        middleName: {type: DataTypes.STRING, allowNull: false},
        licenseNumber: {type: DataTypes.STRING, unique: true, allowNull: false}
    }, {timestamps: false, freezeTableName: true});
};