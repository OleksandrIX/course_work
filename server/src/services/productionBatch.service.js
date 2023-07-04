const ProductionBatch = require("../models/ProductionBatch");

module.exports.findAll = async () => (await ProductionBatch.findAll()).map((batch) => batch.toJSON());
module.exports.findAllByHospitalId = async (hospitalId) => (await ProductionBatch.findAll({ where: { hospitalId } })).map((batch) => batch.toJSON());
module.exports.findBySerialNumber = async (serialNumberBatch) => (await ProductionBatch.findOne({ where: { serialNumberBatch } }))?.toJSON();
module.exports.save = async (batchData) => (await ProductionBatch.create(batchData)).toJSON();
module.exports.deleteBuSerialNumber = (serialNumberBatch) => ProductionBatch.destroy({ where: { serialNumberBatch } });