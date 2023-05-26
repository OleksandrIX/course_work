const router = require("express").Router();
const AdminController = require("../../controllers/admin");

router.get("/",  AdminController.getHomePage);
router.get("/users",  AdminController.getUsersPage);
router.get("/units",  AdminController.getUnitsPage);

module.exports = router;