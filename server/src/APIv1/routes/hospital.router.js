const router = require("express").Router();
const HospitalController = require("../controllers/hospital.controller");
const { checkAuthenticated } = require("../../utils/auth.util");

router.get("/", HospitalController.getAllHospitals);

module.exports = router;