const router = require("express").Router();
const WeaponMaintenanceController = require("../../controller/api/weaponMaintenance.controller");

router.get("/",WeaponMaintenanceController.getWeaponMaintenances);
router.get("/:maintenanceId",WeaponMaintenanceController.getWeaponMaintenance);

module.exports = router;