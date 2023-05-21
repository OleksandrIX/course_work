const router = require("express").Router();

const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const {UserRepo: {getUserByUsername, getUserById}} = require("../domain");
const initializePassport = require("../config/passport.config");
initializePassport(passport, getUserByUsername, getUserById);

router.use(flash());
router.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
}));
router.use(passport.initialize());
router.use(passport.session());

const {checkNotAuthenticated} = require("../util/auth");

router.route("/login")
    .get(checkNotAuthenticated, (req, res) => {
        res.render("pages/login");
    })
    .post(checkNotAuthenticated, passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/login",
        failureFlash: true,
    }));

router.post("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        res.redirect("/login");
    });
});

module.exports = router;