const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const { checkAuthenticated } = require("../../utils/auth.util");

router.get("/current", checkAuthenticated, UserController.getCurrentAuthUser);
router.put("/:idUser", checkAuthenticated, UserController.updateUser);
router.delete("/:idUser", checkAuthenticated, UserController.deleteUser);

module.exports = router;