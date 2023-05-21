const router = require("express").Router();
const {checkAuthenticated, checkAdmin} = require("../util/auth");
const AdminController = require("../controller/admin");

router.get("/", checkAuthenticated, checkAdmin, AdminController.getAdminPage);

module.exports = router;