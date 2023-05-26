const router = require("express").Router();
const passport = require("passport");
const session = require("express-session");

const {UserService: {getUserByUsername, getUserById}} = require("../services");
const initializePassport = require("../config/passport.config");
initializePassport(passport, getUserByUsername, getUserById);

router.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
}));
router.use(passport.initialize());
router.use(passport.session());

module.exports = router;