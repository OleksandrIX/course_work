const router = require("express").Router();
const MainController = require("../controller/main");
const {checkAdmin} = require("../util/auth");

router.get("/", MainController.getHomePage);
router.get("/documents/orders", MainController.getDocumentOrdersPage);
router.get("/documents/instructions", MainController.getDocumentInstructionsPage);
router.get(`/documents/:documentId`, MainController.getDocumentPage);
router.get("/users", checkAdmin, MainController.getUsersPage);

module.exports = router;