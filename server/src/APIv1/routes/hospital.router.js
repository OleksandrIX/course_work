const router = require("express").Router();
const HospitalController = require("../controllers/hospital.controller");
const { checkAuthenticated, checkAdmin } = require("../../utils/auth.util");

router.get("/", HospitalController.getAllHospitals);
router.post("/", checkAuthenticated, checkAdmin, HospitalController.createHospital);
router.put("/:idHospital", checkAuthenticated, checkAdmin, HospitalController.updateHospital);
router.delete("/:idHospital", checkAuthenticated, checkAdmin, HospitalController.deleteHospital);

module.exports = router;