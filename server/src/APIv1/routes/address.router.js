const router = require("express").Router();
const AddressController = require("../controllers/address.controller");
const { checkAuthenticated } = require("../../utils/auth.util");

router.post("/", checkAuthenticated, AddressController.createAddress);
router.put("/:idAddress", checkAuthenticated, AddressController.updateAddress);

module.exports = router;