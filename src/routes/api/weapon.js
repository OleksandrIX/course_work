const router = require("express").Router();
const WeaponController = require("../../controller/api/weapon.controller");

router.get("/", WeaponController.getWeapons);
router.get("/:weaponId", WeaponController.getWeapon);
router.post("/", WeaponController.addWeapon);
router.put("/:weaponId", WeaponController.editWeapon);
router.delete("/:weaponId", WeaponController.deleteWeapon);

router.get("/:weaponId/maintenances", WeaponController.getWeaponMaintenances);

module.exports = router;