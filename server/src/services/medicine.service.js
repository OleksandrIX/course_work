const Medicine = require("../models/Medicine");

module.exports.findById = (id) => Medicine.findOne({ where: { idMedicine: id } });
module.exports.findAll = async () => (await Medicine.findAll()).map((medicine) => medicine.toJSON());
module.exports.findByName = async (medicineName) => (await Medicine.findOne({ where: { medicineName } }))?.toJSON();
module.exports.save = async (medicineData) => (await Medicine.create(medicineData)).toJSON();
module.exports.update = (id, medicineData) => Medicine.update(medicineData, { where: { idMedicine: id } });
module.exports.delete = (id) => Medicine.destroy({ where: { idMedicine: id } });