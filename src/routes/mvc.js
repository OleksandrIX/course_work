const router = require("express").Router();
const {checkAuthenticated} = require("../util/auth");
const MvcController = require("../controller/mvc");

router.get("/", checkAuthenticated, MvcController.getMainPage);
router.get("/garrisons/:garrisonId", checkAuthenticated, MvcController.getGarrisonPage);
router.get("/garrisons/:garrisonId/servicemen/:servicemanId", checkAuthenticated, MvcController.getServicemanPage);

module.exports = router;