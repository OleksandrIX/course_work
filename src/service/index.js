const Model = require("../model");

module.exports.isExistsByLicenseNumber = async (licenseNumber)=>{
    const user = await Model.User.findOne({where: {licenseNumber}});
    if (user) return true;
    const personnel = await Model.Personnel.findOne({where: {licenseNumber}});
    return !!personnel;
};

module.exports.UserService = require("./user")(Model);
module.exports.UnitService = require("./unit")(Model);
module.exports.PersonnelService = require("./personnel")(Model);