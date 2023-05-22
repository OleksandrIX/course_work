const router = require("express").Router();
const WeaponMaintenanceController = require("../../controller/api/weaponMaintenance.controller");

router.get("/",WeaponMaintenanceController.getWeaponMaintenances);
router.get("/:maintenanceId",WeaponMaintenanceController.getWeaponMaintenance);
router.post("/",WeaponMaintenanceController.addWeaponMaintenance);
router.put("/:maintenanceId",WeaponMaintenanceController.editMaintenance);
router.delete("/:maintenanceId",WeaponMaintenanceController.deleteMaintenance);

module.exports = router;