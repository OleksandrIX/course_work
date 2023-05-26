const router = require("express").Router();

router.all("/", (req, res) => {
    res.json({message: "This API accounting salaries"});
});

const UserRouter = require("./user");
router.use("/users", UserRouter);

const UnitRouter = require("./unit");
router.use("/units", UnitRouter);

const PersonnelRouter = require("./personnel");
router.use("/personnel", PersonnelRouter);

const SalaryRouter = require("./salary");
router.use("/salaries", SalaryRouter);

router.use((req, res, next) => {
    res.json({message: `Endpoint not found: ${req.originalUrl}`, status: 404});
    next();
});

module.exports = router;