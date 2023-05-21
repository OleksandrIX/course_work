const router = require("express").Router();
const UserController = require("../controller/home");
const {checkAuthenticated, isAdmin} = require("../util/auth");

router.get("/", checkAuthenticated, isAdmin, UserController.getAllCompanyFromUser);

module.exports = router;