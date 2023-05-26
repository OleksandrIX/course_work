const router = require("express").Router();
const UserController = require("../../controllers/user");

router.get("/",  UserController.getHomePage);
router.get("/units/:unitId",  UserController.getUnitPage);
router.get("/units/:unitId/personnel/:personnelId", UserController.getPersonnelPage);

module.exports = router;