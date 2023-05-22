const router = require("express").Router();
const ServicemanController = require("../../controller/api/serviceman.controller");

router.get("/", ServicemanController.getServicemans);
router.get("/:servicemanId", ServicemanController.getServiceman);
router.post("/", ServicemanController.addServiceman);
router.put("/:servicemanId", ServicemanController.editServiceman);
router.delete("/:servicemanId", ServicemanController.deleteServiceman);

router.get("/:servicemanId/weapons", ServicemanController.getWeaponServiceman);

module.exports = router;