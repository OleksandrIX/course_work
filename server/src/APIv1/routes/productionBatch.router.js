const router = require("express").Router();
const ProductionBatchController = require("../controllers/productionBatch.controller");
const { checkAuthenticated, checkAdmin } = require("../../utils/auth.util");

router.get("/hospitals/:idHospital/medicines", checkAuthenticated, ProductionBatchController.getAllBatchesByHospitalId);
router.get("/hospitals/medicines", checkAuthenticated, checkAdmin, ProductionBatchController.getAllBatches);
router.post("/", checkAuthenticated, ProductionBatchController.createProductionBatchAndSaveMedicine);
router.delete("/:serialNumberBatch", checkAuthenticated, ProductionBatchController.deleteProductionBatchBySerialNumber);

module.exports = router;