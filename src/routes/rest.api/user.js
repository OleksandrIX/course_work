const router = require("express").Router();
const UserController = require("../../controller/rest.api/user");

router.get("/", UserController.getAllUsers);
router.get("/:userId", UserController.getOneUserById);

router.post("/", UserController.createUser);
router.put("/:userId", UserController.updateUser);
router.delete("/:userId", UserController.deleteUser);

module.exports = router;