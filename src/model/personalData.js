const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define("personal_data", {
        militaryRank: {type: DataTypes.STRING},
        position: {type: DataTypes.STRING},
        enlistmentDate: {type: DataTypes.DATEONLY},
        birthDate: {type: DataTypes.DATEONLY},
        phone: {type: DataTypes.STRING},
        email: {type: DataTypes.STRING},
        city: {type: DataTypes.STRING},
        address: {type: DataTypes.STRING},
        religion: {type: DataTypes.STRING}
    }, {timestamps: false, freezeTableName: true});
};