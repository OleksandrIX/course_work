const router = require("express").Router();

router.all("/", (req, res) => {
    res.json({message: "This API ACW"});
});

const UserRouter = require("./user");
router.use("/users", UserRouter);

const CompanyRouter = require("./company");
router.use("/companies", CompanyRouter);

const ServicemanRouter = require("./serviceman");
router.use("/servicemans", ServicemanRouter);

const WeaponRouter = require("./weapon");
router.use("/weapons", WeaponRouter);

const WeaponMaintenanceRouter = require("./weaponMaintenance");
router.use("/maintenances", WeaponMaintenanceRouter);

router.use((req, res, next) => {
    res.json({message: `Endpoint not found: ${req.originalUrl}`, status: 404});
    next();
});

module.exports = router;