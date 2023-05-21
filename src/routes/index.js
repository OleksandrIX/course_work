const router = require("express").Router();

router.all("/", (req, res) => res.redirect("/login"));

const authRouter = require("./auth");
router.use(authRouter);

const homeRouter = require("./home");
router.use("/home", homeRouter);

const adminRouter = require("./admin");
router.use("/admin", adminRouter);

const apiRoutes = require("./api");
router.use("/api", apiRoutes);

router.use((req, res, next) => {
    res.render("pages/notFound");
    next();
});

module.exports = router;