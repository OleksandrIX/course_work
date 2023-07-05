const express = require("express");
const cors = require("cors");

const router = express.Router();
const {client} = require("../configs/app.config");

router.use(express.urlencoded({extended: false}));
router.use(express.json());
router.use(cors({
    origin: client,
    credentials: true,
}));

module.exports = router;