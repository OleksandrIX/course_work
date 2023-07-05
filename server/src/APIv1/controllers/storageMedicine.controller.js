const StorageMedicineService = require("../../services/storageMedicine.service");
const { apiError } = require("./error.controller");

module.exports.getAllStorages = async (req, res) => {
    try {
        const storages = await StorageMedicineService.findAll();
        res.status(200).json(storages);
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.getAllStoragesByHospitalId = async (req, res) => {
    const { idHospital } = req.params;
    try {
        const storages = await StorageMedicineService.findAllByHospitalId(idHospital);
        res.status(200).json(storages);
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.getOneStorageById = async (req, res) => {
    const { idStorage } = req.params;
    try {
        let storage = await StorageMedicineService.findById(idStorage);
        if (!storage) return apiError(res, 404, "Storage not found");

        res.status(200).json(storage);
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.createStorage = async (req, res) => {
    const storageData = req.body;
    try {
        let storage = await StorageMedicineService.save(storageData);
        storage = await StorageMedicineService.findById(storage.idStorage);
        if (!storage) return apiError(res, 404, "Storage not found");
        res.status(200).json(storage);
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.updateStorage = async (req, res) => {
    const { idStorage } = req.params;
    const storageData = req.body;
    try {
        const storage = await StorageMedicineService.update(idStorage, storageData);
        res.status(200).json(storage);
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.deleteStorage = async (req, res) => {
    const { idStorage } = req.params;
    try {
        let storage = await StorageMedicineService.findById(idStorage);
        if (!storage) return apiError(res, 404, "Storage not found");
        await StorageMedicineService.delete(idStorage);
        res.status(200).json({ message: "Storage deleted successfully" });
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};