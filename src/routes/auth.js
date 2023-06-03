const router = require("express").Router();
const AuthController = require("../controller/auth");
const {checkNotAuthenticated, checkAuthenticated} = require("../helper/auth");
router.get("/login", checkNotAuthenticated, (req, res) => {
    const errorMessage = req.session.errorMessage;
    req.session.errorMessage = null;
    res.render("pages/login", {errorMessage});
});
router.post("/login", AuthController.login);

router.get("/registration", checkNotAuthenticated, (req, res) => {
    const errorMessage = req.session.errorMessage;
    req.session.errorMessage = null;
    res.render("pages/registration", {errorMessage});
});
router.post("/registration", AuthController.registration);

router.delete("/logout", checkAuthenticated, AuthController.logout);

module.exports = router;