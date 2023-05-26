const Model = require("../models");

const UserService = require("./user.service")(Model);
const UnitService = require("./unit.service")(Model);
const PersonnelService = require("./personnel.service")(Model);
const SalaryService = require("./salary.service")(Model);

module.exports={
    UserService,
    UnitService,
    PersonnelService,
    SalaryService,
};