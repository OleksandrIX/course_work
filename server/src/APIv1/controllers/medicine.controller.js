const MedicineService = require("../../services/medicine.service");
const { apiError } = require("./error.controller");

module.exports.getOneMedicineById = async (req, res) => {
    const { idMedicine } = req.params;
    try {
        const medicine = await MedicineService.findById(idMedicine)
        if (!medicine) return apiError(res, 404, "Лікарського засобу не знайдено");
        res.status(200).json(medicine);
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.getAllMedicines = async (req, res) => {
    try {
        const medicines = await MedicineService.findAll();
        res.status(200).json({ medicines });
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.createMedicine = async (req, res) => {
    const medicineData = req.body;
    try {
        let medicine = await MedicineService.findByName(medicineData.medicineName);
        if (medicine) return apiError(res, 409, "Лікарський засіб з такою назвою вже існує");

        medicine = await MedicineService.save(medicineData);
        res.status(201).json({ message: "Medicine created successfully", medicine });
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.editMedicine = async (req, res) => {
    const { idMedicine } = req.params;
    const medicineData = req.body;
    try {
        let medicine = await MedicineService.findById(idMedicine);
        if (!medicine) return apiError(res, 404, "Лікарського засобу не знайдено");

        if (medicineData.medicineName && medicine.medicineName !== medicineData.medicineName &&
            await MedicineService.findByName(medicineData.medicineName))
            return apiError(res, 409, "Лікарський засіб з такою назвою вже існує");

        await MedicineService.update(idMedicine, medicineData);
        res.status(200).json({ message: "Medicine updated successfully" });
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.deleteMedicine = async (req, res) => {
    const { idMedicine } = req.params;
    try {
        const medicine = await MedicineService.findById(idMedicine);
        if (!medicine) return apiError(res, 404, "Midicine not found");
        await MedicineService.delete(idMedicine);
        res.status(200).json({ message: "Medicine deleted successfully" });
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};