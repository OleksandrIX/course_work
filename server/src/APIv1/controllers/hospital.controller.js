const HospitalService = require("../../services/hospital.service");
const { apiError } = require("./error.controller");

module.exports.getAllHospitals = async (req, res) => {
    try {
        const hospitals = await HospitalService.findAll();
        res.status(200).json({ hospitals });
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.createHospital = async (req, res) => {
    const hospitalData = req.body;
    try {
        let hospital = await HospitalService.findByName(hospitalData.nameHospital);
        if (hospital) return apiError(res, 409, "Шпиталь з такою назвою вже існує");
        hospital = await HospitalService.save(hospitalData);
        res.status(201).json(hospital);
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.updateHospital = async (req, res) => {
    const { idHospital } = req.params;
    const hospitalData = req.body;
    try {
        let hospital = await HospitalService.findById(idHospital);
        if (!hospital) return apiError(res, 404, "Hospital not found");
        if (hospitalData.nameHospital && hospital.nameHospital !== hospitalData.nameHospital &&
            await HospitalService.findByName(hospitalData.nameHospital))
            return apiError(res, 409, "Шпиталь з такою назвою вже існує");

        await HospitalService.update(idHospital, hospitalData);
        res.status(200).json({ message: "Hospital updated successfully" });
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.deleteHospital = async (req, res) => {
    const { idHospital } = req.params;
    try {
        const hospital = await HospitalService.findById(idHospital);
        if (!hospital) return apiError(res, 404, "Hospital not found");
        await HospitalService.delete(idHospital);
        res.status(200).json({ message: "Hospital deleted successfully" });
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};