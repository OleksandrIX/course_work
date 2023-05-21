const router = require("express").Router();
const UserController = require("../../controller/api/user.controller");

router.get("/", UserController.getUsers);
router.get("/:userId", UserController.getUser);
router.post("/", UserController.addUser);
router.put("/:userId", UserController.editUser);
router.delete("/:userId", UserController.deleteUser);

router.get("/:userId/companies", UserController.getAllCompaniesInUser);

module.exports = router;