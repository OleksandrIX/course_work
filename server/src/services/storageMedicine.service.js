const StorageMedicine = require("../models/StorageMedicine");
const Medicine = require("../models/Medicine");

module.exports.findById = async (id) => (await StorageMedicine.findOne({ where: { idStorage: id }, include: Medicine }))?.toJSON();
module.exports.findAll = async () => (await StorageMedicine.findAll()).map((storage) => storage.toJSON());
module.exports.findAllByHospitalId = async (hospitalId) => (await StorageMedicine.findAll({ where: { hospitalId }, include: Medicine })).map((storage) => storage.toJSON());
module.exports.save = async (storageData) => (await StorageMedicine.create(storageData))?.toJSON();
module.exports.update = async (id, storageData) => (await StorageMedicine.update(storageData, { where: { idStorage: id } }));
module.exports.delete = (id) => StorageMedicine.destroy({ where: { idStorage: id } });