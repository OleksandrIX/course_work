const router = require("express").Router();
const {checkAuthenticated} = require("../../utils/auth.util");

const AuthRouter = require("./auth.router");
router.use("/auth", AuthRouter);

router.get("/main", checkAuthenticated, (req, res) => {
    const arr = [
        {a: 1, b: 2},
        {a: 1, b: 2},
        {a: 1, b: 2},
        {a: 1, b: 2},
        {a: 1, b: 2},
        {a: 1, b: 2},
        {a: 1, b: 2},
    ];

    console.log(req.session);
    console.log(req.user);
    res.json({arr});
});

module.exports = router;