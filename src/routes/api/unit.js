const router = require("express").Router();
const unitController = require("../../controller/api/unit");

router.get("/", unitController.getUnits);
router.get("/:unitId", unitController.getUnit);
router.post("/", unitController.createUnit);
router.put("/:unitId", unitController.editUnit);
router.delete("/:unitId", unitController.deleteUnit);

module.exports = router;