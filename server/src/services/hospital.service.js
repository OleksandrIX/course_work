const Hospital = require("../models/Hospital");

module.exports.findById = async (id) => (await Hospital.findOne({ where: { idHospital: id } }))?.toJSON();
module.exports.findAll = async () => (await Hospital.findAll()).map((hospital) => hospital.toJSON());