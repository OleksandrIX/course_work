const {Sequelize, DataTypes} = require("sequelize");
const db = require("../config/database");
const {createAdmin} = require("../util/database");

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
const Garrison = require("./garrison")(sequelize);
const MilitaryUnit = require("./militaryUnit")(sequelize);
const Serviceman = require("./serviceman")(sequelize);

const LocationServiceman = sequelize.define("location_serviceman",
    {
        servicemanId: {type: DataTypes.INTEGER, unique: {name: "servicemanId"}},
    }, {timestamps: false, freezeTableName: true});

User.hasMany(Garrison, {onDelete: "CASCADE"});
Garrison.belongsTo(User, {onDelete: "CASCADE"});

Garrison.hasMany(MilitaryUnit, {onDelete: "CASCADE"});
MilitaryUnit.belongsTo(Garrison, {onDelete: "CASCADE"});

Serviceman.hasOne(LocationServiceman);
LocationServiceman.belongsTo(Serviceman, {foreignKey: "servicemanId", onDelete: "CASCADE"});

MilitaryUnit.hasMany(LocationServiceman, {foreignKey: "currentMilitaryUnitId", onDelete: "CASCADE"});
LocationServiceman.belongsTo(MilitaryUnit, {foreignKey: "currentMilitaryUnitId", onDelete: "CASCADE"});

LocationServiceman.belongsTo(MilitaryUnit, {foreignKey: "permanentMilitaryUnitId", onDelete: "CASCADE"});

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
    User, Serviceman, MilitaryUnit, Garrison, LocationServiceman,
};