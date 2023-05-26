const router = require("express").Router();
const UnitController = require("../../controllers/api/unit");

router.get("/", UnitController.getUnits);
router.get("/:unitId", UnitController.getUnit);
router.post("/", UnitController.createUnit);
router.put("/:unitId", UnitController.updateUnit);
router.delete("/:unitId", UnitController.deleteUnit);

router.get("/:unitId/personnel", UnitController.getPersonnelOfUnit);

module.exports = router;