const router = require("express").Router();

const AuthRouter = require("./auth.router");
router.use("/auth", AuthRouter);

module.exports = router;