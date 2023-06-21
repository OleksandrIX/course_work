const router = require("express").Router();
const passport = require("passport");
const session = require("express-session");

const initializePassport = require("../config/passport");
const {UserService} = require("../service");

const {findById, findByUsername} = UserService;
initializePassport(passport, findByUsername, findById);

router.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
}));
router.use(passport.initialize());
router.use(passport.session());

module.exports = router;