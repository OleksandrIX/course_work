const router = require("express").Router();
const CompanyController = require("../../controller/api/company.controller");

router.get("/", CompanyController.getCompanies);
router.get("/:companyId", CompanyController.getCompany);
router.post("/", CompanyController.addCompany);
router.put("/:companyId", CompanyController.editCompany);
router.delete("/:companyId", CompanyController.deleteCompany);

router.get("/:companyId/servicemans", CompanyController.getServicemansInCompany);

module.exports = router;