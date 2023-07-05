const Hospital = require("../models/Hospital");

module.exports.findById = async (id) => (await Hospital.findOne({ where: { idHospital: id } }))?.toJSON();
module.exports.findByName = async (name) => (await Hospital.findOne({ where: { nameHospital: name } }))?.toJSON();
module.exports.findAll = async () => (await Hospital.findAll()).map((hospital) => hospital.toJSON());
module.exports.save = async (hospitalData) => (await Hospital.create(hospitalData)).toJSON();
module.exports.update = (id, hospitalData) => Hospital.update(hospitalData, { where: { idHospital: id } });
module.exports.delete = (id) => Hospital.destroy({ where: { idHospital: id } });