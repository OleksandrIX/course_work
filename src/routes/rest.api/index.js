const router = require("express").Router();

router.all("/", (req, res) => {
    res.status(200).json({
        message: "This API for accounting for servicemen temporarily in garrison"
    });
});

const UserRouter = require("./user");
router.use("/users", UserRouter);

const GarrisonRouter = require("./garrison");
router.use("/garrisons", GarrisonRouter);

const MilitaryUnitRouter = require("./militaryUnit");
router.use("/military-units", MilitaryUnitRouter);

const ServicemanRouter = require("./serviceman");
router.use("/servicemen", ServicemanRouter);

router.use((req, res) => {
    res.status(404).json({
        message: `Endpoint not found: ${req.originalUrl}`,
        method: req.method,
        status: 404
    });
});

module.exports = router;