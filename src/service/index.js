const Model = require("../model");
module.exports.UserService = require("./user")(Model);
module.exports.GarrisonService = require("./garrison")(Model);
module.exports.MilitaryUnitService = require("./militaryUnit")(Model);
module.exports.ServicemanService = require("./serviceman")(Model);