const router = require("express").Router();
const passport = require("passport");
const session = require("express-session");
const {UserService: {getUserByUsername, getUserById}} = require("../service");
const {checkAuthenticated} = require("../helper/auth");

const initializePassport = require("../config/passport");
initializePassport(passport, getUserByUsername, getUserById);
router.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
}));
router.use(passport.initialize());
router.use(passport.session());

const ApiRouter = require("./api");
router.use("/api", ApiRouter);

const AuthRouter = require("./auth");
router.use("/", AuthRouter);

const MvcRouter = require("./mvc");
router.use(checkAuthenticated, MvcRouter);

router.use((req, res) => {
    res.status(404).render("pages/error", {
        status: 404,
        error: "Not Found",
        message: "Такої сторінки не існує.",
    });
});

module.exports = router;