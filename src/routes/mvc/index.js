const router = require("express").Router();

const MainRouter = require("./main");
router.use("/", MainRouter);

module.exports = router;