const router = require("express").Router();
const MilitaryUnitController = require("../../controller/rest.api/militaryUnit");

router.get("/", MilitaryUnitController.getAllMilitaryUnits);
router.get("/:militaryUnitId", MilitaryUnitController.getOneMilitaryUnitById);

router.post("/", MilitaryUnitController.createMilitaryUnit);
router.put("/:militaryUnitId", MilitaryUnitController.updateMilitaryUnit);
router.delete("/:militaryUnitId", MilitaryUnitController.deleteMilitaryUnit);

module.exports = router;