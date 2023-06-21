const router = require("express").Router();

const AuthRouter = require("./auth");
router.use(AuthRouter);

const ApiRouter = require("./rest.api");
router.use("/api", ApiRouter);

const MvcRouter = require("./mvc");
router.use(MvcRouter);

router.use((req, res) => {
    res.status(404).render("pages/error", {
        status: 404,
        error: "Not Found",
        message: "Такої сторінки не існує.",
    });
});

module.exports = router;