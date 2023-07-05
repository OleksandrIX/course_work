const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const {checkNotAuthenticated, checkAuthenticated} = require("../../utils/auth.util");

router.get("/check", AuthController.check);
router.get("/check-admin", AuthController.checkAdmin);
router.post("/login", checkNotAuthenticated, AuthController.login);
router.post("/registration", checkNotAuthenticated, AuthController.registration);
router.delete("/logout", checkAuthenticated, AuthController.logout);

module.exports = router;