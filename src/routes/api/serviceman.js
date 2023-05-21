const router = require("express").Router();
const ServicemanController = require("../../controller/api/serviceman.controller");

router.get("/", ServicemanController.getServicemans);
router.post("/", ServicemanController.addServicemans);
router.get("/:servicemanId", ServicemanController.getServiceman);
router.get("/:servicemanId/weapons", ServicemanController.getWeaponServiceman);

module.exports = router;