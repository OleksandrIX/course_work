const {Sequelize} = require("sequelize");
const bcrypt = require("bcrypt");
const mysqlConfig = require("../config/database.config");

const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.username, mysqlConfig.password, mysqlConfig.options);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connect successful");
    } catch (error) {
        console.log("Error: ", error);
    }
})();

const User = require("./user.model")(sequelize);
const Unit = require("./unit.model")(sequelize);
const Personnel = require("./personnel.model")(sequelize);
const Salary = require("./salary.model")(sequelize);

Unit.hasOne(Personnel, {foreignKey: "unit_commander_id"});

Unit.hasMany(Personnel, {foreignKey: "unit_id"});
Personnel.belongsTo(Unit, {foreignKey: "unit_id"});

Personnel.hasMany(Salary, {foreignKey: "personnel_id"});
Salary.belongsTo(Personnel, {foreignKey: "personnel_id"});

(async () => {
    try {
        await sequelize.sync({alter: true});
        console.log("DB re-sync");

        const admin = await User.findOne({where: {role: "ADMIN"}});
        if (!admin) {
            const password = await bcrypt.hash("admin", 10);
            await User.create({
                username: "admin",
                password,
                role: "ADMIN",
                isActive: true,
            });
            console.log("Admin created");
        }
    } catch (error) {
        console.log("Error: ", error);
    }
})();

module.exports = {
    User,
    Unit,
    Personnel,
    Salary,
};