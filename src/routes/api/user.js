const router = require("express").Router();
const UserController = require("../../controller/api/user");

router.get("/", UserController.getUsers);
router.get("/:userId", UserController.getUser);
router.post("/", UserController.createUser);
router.put("/:userId", UserController.updateUser);
router.delete("/:userId", UserController.deleteUser);

module.exports = router;