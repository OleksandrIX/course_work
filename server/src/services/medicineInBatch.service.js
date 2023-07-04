const MedicineInBatch = require("../models/MedicineInBacth");

module.exports.findAllByBatchId = async (batchId) => (await MedicineInBatch.findAll({ where: { batchId } })).map((medicine) => medicine.toJSON());
module.exports.findBySerialNumber = async (serialNumberMedicine) => (await MedicineInBatch.findOne({ where: { serialNumberMedicine } }))?.toJSON();
module.exports.save = async (medicineInBatchData) => (await MedicineInBatch.create(medicineInBatchData)).toJSON();