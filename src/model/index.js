const {Sequelize} = require("sequelize");
const db = require("../config/db");
const {createAdmin} = require("../helper/db");

const sequelize = new Sequelize(db.database, db.username, db.password, db.options);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connect successful");
    } catch (error) {
        console.log("Error: ", error);
    }
})();

const User = require("./user")(sequelize);
const Unit = require("./unit")(sequelize);
const Personnel = require("./personnel")(sequelize);
const PersonalData = require("./personalData")(sequelize);

User.hasOne(Unit, {onDelete: 'CASCADE'});
Unit.belongsTo(User, {onDelete: 'CASCADE'});

Unit.hasMany(Personnel, {onDelete: 'CASCADE'});
Personnel.belongsTo(Unit, {onDelete: 'CASCADE'});

Personnel.hasOne(PersonalData, {onDelete: 'CASCADE'});
PersonalData.belongsTo(Personnel, {onDelete: 'CASCADE'});

(async () => {
    try {
        await sequelize.sync({alter: true});
        console.log("DB re-sync");

        await createAdmin(User);
    } catch (error) {
        console.log("Error: ", error);
    }
})();

module.exports = {
    User,
    Unit,
    Personnel,
    PersonalData,
};