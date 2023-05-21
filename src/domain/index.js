const {Sequelize} = require("sequelize");
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

const User = require("./User/model")(sequelize);
const Company = require("./Company/model")(sequelize);
const Weapon = require("./Weapon/model")(sequelize);
const Serviceman = require("./Serviceman/model")(sequelize);
const WeaponMaintenance = require("./WeaponMaintenance/model")(sequelize);

User.hasMany(Company, {foreignKey: "user_id"});
Company.belongsTo(User, {foreignKey: "user_id"});

Company.hasMany(Serviceman, {foreignKey: "company_id"});
Serviceman.belongsTo(Company, {foreignKey: "company_id"});

Serviceman.hasMany(Weapon, {foreignKey: "serviceman_id"});
Weapon.belongsTo(Serviceman, {foreignKey: "serviceman_id"});

Weapon.hasMany(WeaponMaintenance, {foreignKey: "weapon_id"});
WeaponMaintenance.belongsTo(Weapon, {foreignKey: "weapon_id"});

(async () => {
    try {
        await sequelize.sync({});
        console.log("DB re-sync");
    } catch (error) {
        console.log("Error: ", error);
    }
})();

const Repositories = {
    UserRepo: require("./User/repositories")(User),
    CompanyRepo: require("./Company/repositories")(Company),
    ServicemanRepo: require("./Serviceman/repositories")(Serviceman),
    WeaponRepo: require("./Weapon/repositories")(Weapon),
    WeaponMaintenanceRepo: require("./WeaponMaintenance/repositories")(WeaponMaintenance),
};

module.exports = Repositories;