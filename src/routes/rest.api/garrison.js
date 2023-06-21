const router = require("express").Router();
const GarrisonController = require("../../controller/rest.api/garrison");

router.get("/", GarrisonController.getAllGarrison);
router.get("/:garrisonId", GarrisonController.getOneGarrisonById);

router.post("/", GarrisonController.createGarrison);
router.put("/:garrisonId", GarrisonController.updateGarrison);
router.delete("/:garrisonId", GarrisonController.deleteGarrison);

module.exports = router;