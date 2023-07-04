const router = require("express").Router();
const MedicineController = require("../controllers/medicine.controller");
const { checkAuthenticated, checkAdmin } = require("../../utils/auth.util");

router.get("/", checkAuthenticated, MedicineController.getAllMedicines);
router.get("/:idMedicine", checkAuthenticated, MedicineController.getOneMedicineById);
router.post("/", checkAuthenticated, checkAdmin, MedicineController.createMedicine);
router.put("/:idMedicine", checkAuthenticated, checkAdmin, MedicineController.editMedicine);
router.delete("/:idMedicine", checkAuthenticated, checkAdmin, MedicineController.deleteMedicine);

module.exports = router;