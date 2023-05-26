const router = require("express").Router();
const AuthController = require("../controllers/auth");
const {checkNotAuthenticated, checkAuthenticated} = require("../util/auth");

router.route("/registration")
    .get(checkNotAuthenticated, (req, res) => {
        const errorMessage = req.session.errorMessage;
        req.session.errorMessage = null;
        res.render("pages/auth/registration", {errorMessage});
    })
    .post(checkNotAuthenticated, AuthController.registration);

router.route("/login")
    .get(checkNotAuthenticated, (req, res) => {
        const errorMessage = req.session.errorMessage;
        req.session.errorMessage = null;
        res.render("pages/auth/login", {errorMessage});
    })
    .post(checkNotAuthenticated, AuthController.login);

router.delete("/logout", checkAuthenticated, AuthController.logout);

module.exports = router;