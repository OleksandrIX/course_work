const router = require("express").Router();
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const UserService = require("../services/user.service");
const initAuthConfig = require("../configs/auth.config");

router.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
}));
router.use(cookieParser("secret_key"));
router.use(passport.initialize());
router.use(passport.session());
initAuthConfig(passport, UserService);

module.exports = router;