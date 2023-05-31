const router = require("express").Router();
const {checkAuthenticated} = require("../util/auth");

const AuthMiddleware = require("../middleware/auth");
router.use(AuthMiddleware);

const apiRoutes = require("./api");
router.use("/api", apiRoutes);

const AuthRouter = require("./auth");
router.use("/", AuthRouter);

const MainRouter = require("./main");
router.use("/", checkAuthenticated, MainRouter);

router.use((req, res) => {
    res.status(404).render('pages/error', {
        status: 404,
        error: 'Not Found',
        message: 'Такої сторінки не існує.',
    });
});

module.exports = router;