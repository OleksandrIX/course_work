const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define("salaries", {
        id_salary: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        salary_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(7, 2),
            allowNull: false,
        },
        personnel_id:{
            type: DataTypes.INTEGER,
            onDelete: "CASCADE",
        },
    }, {timestamps: false, freezeTableName: true});
};