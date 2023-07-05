const router = require("express").Router();
const StorageMedicineController = require("../controllers/storageMedicine.controller");
const { checkAuthenticated } = require("../../utils/auth.util");

router.get("/", checkAuthenticated, StorageMedicineController.getAllStorages);
router.get("/hospitals/:idHospital", checkAuthenticated, StorageMedicineController.getAllStoragesByHospitalId);
router.get("/:idStorage", checkAuthenticated, StorageMedicineController.getOneStorageById);
router.post("/", checkAuthenticated, StorageMedicineController.createStorage);
router.put("/:idStorage", checkAuthenticated, StorageMedicineController.updateStorage);
router.delete("/:idStorage", checkAuthenticated, StorageMedicineController.deleteStorage);

module.exports = router;
