const router = require("express").Router();
const DocumentController = require("../../controller/api/document");

router.get("/", DocumentController.getDocuments);
router.get("/:documentId", DocumentController.getDocument);
router.post("/", DocumentController.createDocument);
router.put("/:documentId", DocumentController.updateDocument);
router.delete("/:documentId", DocumentController.deleteDocument);

module.exports = router;