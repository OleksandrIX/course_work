const router = require("express").Router();

router.all("/", (req, res) => {
    res.json({
        message: "This API for accounting of personal data in unit"
    });
});

const UserRouter = require("./user");
router.use("/users", UserRouter);

const UnitRouter = require("./unit");
router.use("/units", UnitRouter);

const PersonnelRouter = require("./personnel");
router.use("/personnel", PersonnelRouter);

router.use((req, res) => {
    res.json({
        message: `Endpoint not found: ${req.originalUrl}`,
        method: req.method,
        status: 404
    });
});


module.exports = router;