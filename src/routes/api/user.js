const router = require("express").Router();
const userController = require("../../controller/api/user");

router.get("/", userController.getUsers);
router.get("/:userId", userController.getUser)
router.post("/", userController.createUser);
router.put("/:userId", userController.editUser);
router.delete("/:userId", userController.deleteUser);

module.exports = router;