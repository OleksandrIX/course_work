const router = require("express").Router();
const passport = require("passport");
const session = require("express-session");

const UserService = require("../services/user.service");
const initAuthConfig = require("../configs/auth.config");

initAuthConfig(passport, UserService);
router.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
}));
router.use(passport.initialize());
router.use(passport.session());

module.exports = router;