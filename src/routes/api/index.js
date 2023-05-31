const router = require("express").Router();

router.all("/", (req, res) => {
    res.json({message: "This API accounting of orders and instructions"});
});

const UserRouter = require("./user");
router.use("/users", UserRouter);

const DocumentRouter = require("./document");
router.use("/documents", DocumentRouter);

router.use((req, res, next) => {
    res.json({message: `Endpoint not found: ${req.originalUrl}`, status: 404});
    next();
});

module.exports = router;