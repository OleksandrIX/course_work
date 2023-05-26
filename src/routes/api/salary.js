const router = require("express").Router();
const SalaryController = require("../../controllers/api/salary");

router.get("/:salaryId", SalaryController.getSalary);
router.post("/", SalaryController.createSalary);
router.put("/:salaryId", SalaryController.updateSalary);
router.delete("/:salaryId", SalaryController.deleteSalary);

module.exports = router;