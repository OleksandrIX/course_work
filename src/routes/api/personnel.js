const router = require("express").Router();
const PersonnelController = require("../../controllers/api/personnel");

router.get("/", PersonnelController.getAllPersonnel);
router.get("/:personnelId", PersonnelController.getPersonnel);
router.post("/", PersonnelController.createPersonnel);
router.put("/:personnelId", PersonnelController.updatePersonnel);
router.delete("/:personnelId", PersonnelController.deletePersonnel);

module.exports = router;