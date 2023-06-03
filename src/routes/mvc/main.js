const router = require("express").Router();
const mainController = require("../../controller/mvc/main");

router.get("/", mainController.getMainPage);
router.get("/units/:unitId", mainController.getUnitPage);
router.get("/personnel/:personnelId", mainController.getPersonnelPage);

module.exports = router;