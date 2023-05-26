const router = require("express").Router();
const {checkAuthenticated, checkAdmin} = require("../util/auth");

const AuthMiddleware = require("../middleware/auth");
router.use(AuthMiddleware);

const apiRoutes = require("./api");
router.use("/api", apiRoutes);

const AuthRouter = require("./auth");
router.use("/auth", AuthRouter);

const UserRouter = require("./mvc/user");
router.use("/", checkAuthenticated, UserRouter);

const AdminRouter = require("./mvc/admin");
router.use("/admin", checkAdmin, checkAuthenticated, AdminRouter);

const ErrorMiddleware = require("../middleware/error");
router.use(ErrorMiddleware);

module.exports = router;