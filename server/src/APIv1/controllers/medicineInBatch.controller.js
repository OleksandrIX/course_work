const MedicineInBatchService = require("../../services/medicineInBatch.service");
const { apiError } = require("./error.controller");

module.exports.getMedicineInBatchBySerialNumber = async (req, res) => {
    const { serialNumberMedicine } = req.params;
    try {
        const medicineInBatch = await MedicineInBatchService.findBySerialNumber(serialNumberMedicine);
        if (!medicineInBatch) return apiError(res, 404, "Medicine in batch not found");
        res.status(200).json(medicineInBatch);
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};