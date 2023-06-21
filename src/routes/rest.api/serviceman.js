const router = require("express").Router();
const ServicemanController = require("../../controller/rest.api/serviceman");

router.get("/", ServicemanController.getAllServicemen);
router.get("/:servicemanId", ServicemanController.getOneServicemanById);

router.post("/", ServicemanController.createServicemen);
router.put("/:servicemanId", ServicemanController.updateServicemen);
router.delete("/:servicemanId", ServicemanController.deleteServicemen);

module.exports = router;