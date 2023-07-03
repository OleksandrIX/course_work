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