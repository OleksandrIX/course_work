const router = require("express").Router();
const personnelController = require("../../controller/api/personnel");

router.get("/", personnelController.getAllPersonnel);
router.get("/:personnelId", personnelController.getOnePersonnel);
router.post("/", personnelController.createPersonnel);
router.put("/:personnelId", personnelController.editPersonnel);
router.delete("/:personnelId", personnelController.deletePersonnel);

router.put("/personal-data/:personalDataId", personnelController.editPersonalData);

module.exports = router;