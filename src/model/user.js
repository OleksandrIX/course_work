const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define("user", {
        username: {type: DataTypes.STRING, unique: true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        role: {type: DataTypes.STRING, allowNull: false, defaultValue: "USER"},
        lastName: {type: DataTypes.STRING},
        firstName: {type: DataTypes.STRING},
        middleName: {type: DataTypes.STRING},
        licenseNumber: {type: DataTypes.STRING, unique: true}
    }, {timestamps: false, freezeTableName: true});
};