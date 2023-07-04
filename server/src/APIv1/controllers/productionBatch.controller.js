const ProductionBatchService = require("../../services/productionBatch.service");
const MedicineInBatchService = require("../../services/medicineInBatch.service");
const MedicineService = require("../../services/medicine.service");
const HospitalService = require("../../services/hospital.service");
const { apiError } = require("./error.controller");

const getProductionBatches = async (productionBatchesData) => {
    const productionBatches = [];

    for (const batch of productionBatchesData) {
        delete batch.hospitalId;

        let medicines = await MedicineInBatchService.findAllByBatchId(batch.idBatch);
        medicines = await Promise.all(medicines.map(async (medicine) => {
            const medicineData = await MedicineService.findById(medicine.medicineId);
            delete medicine.medicineId;
            delete medicine.batchId;

            medicine.medicineData = medicineData;
            return medicine;
        }));

        batch.medicines = medicines;
        productionBatches.push(batch);
    }

    return productionBatches;
};

const checkAccessToHospital = (user, idHospital) => {
    if (user.role === "ADMIN") return true;
    if (user.hospitalId === parseInt(idHospital)) return true;
    return false;
}

module.exports.getAllBatches = async (req, res) => {
    const responseData = [];
    try {
        const hospitals = await HospitalService.findAll();

        for (const hospital of hospitals) {
            const productionBatchesData = await ProductionBatchService.findAllByHospitalId(hospital.idHospital);
            const productionBatches = await getProductionBatches(productionBatchesData);

            responseData.push({ hospital, batches: productionBatches });
        }

        res.status(200).json(responseData);
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.getAllBatchesByHospitalId = async (req, res) => {
    const { idHospital } = req.params;
    try {
        if (!checkAccessToHospital((await req.user).toJSON(), idHospital))
            return apiError(res, 403, "You do not have access to this hospital");

        const hospital = await HospitalService.findById(idHospital);
        if (!hospital) return apiError(res, 404, "Hospital not found");

        const productionBatchesData = await ProductionBatchService.findAllByHospitalId(idHospital);
        const productionBatches = await getProductionBatches(productionBatchesData);

        res.status(200).json(productionBatches);
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.createProductionBatchAndSaveMedicine = async (req, res) => {
    const { batch, medicinesInBatch } = req.body;
    try {
        let productionBatch = await ProductionBatchService.findBySerialNumber(batch.serialNumberBatch);
        if (productionBatch) return apiError(res, 409, "Партія лікарських засобів з таким серійним номером вже існує");
        productionBatch = await ProductionBatchService.save(batch);

        for (const medicineInBatch of medicinesInBatch) {
            medicineInBatch.batchId = productionBatch.idBatch;
            await MedicineInBatchService.save(medicineInBatch);
        }

        res.status(200).json({ message: "Production batch saved successfully" });
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.deleteProductionBatchBySerialNumber = async (req, res) => {
    const { serialNumberBatch } = req.params;
    try {
        const productionBatch = await ProductionBatchService.findBySerialNumber(serialNumberBatch);
        if (!productionBatch) return apiError(res, 404, "Production batch not found");

        await ProductionBatchService.deleteBuSerialNumber(serialNumberBatch);
        res.status(200).json({ message: "Production batch deleted successfully" });
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};