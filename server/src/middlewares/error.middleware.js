const router = require("express").Router();

router.use((req, res, next)=>{
    res.status(404).json({
        message: `Endpoint not found: ${req.originalUrl}`,
        method: req.method,
    });
    next();
});

module.exports = router;