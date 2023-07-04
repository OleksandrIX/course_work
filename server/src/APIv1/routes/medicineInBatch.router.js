const router = require("express").Router();
const MedicineInBatchController = require("../controllers/medicineInBatch.controller");
const { checkAuthenticated } = require("../../utils/auth.util");

router.get("/:serialNumberMedicine", checkAuthenticated, MedicineInBatchController.getMedicineInBatchBySerialNumber);

module.exports = router;