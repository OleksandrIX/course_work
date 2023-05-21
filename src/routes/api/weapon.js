const router = require("express").Router();
const WeaponController = require("../../controller/api/weapon.controller");

router.get("/", WeaponController.getWeapons);
router.get("/:weaponId", WeaponController.getWeapon);
router.post("/", WeaponController.addWeapons);
router.put("/:weaponId", WeaponController.editWeapons);
router.delete("/:weaponId", WeaponController.deleteWeapons);

router.get("/:weaponId/maintenances", WeaponController.getWeaponMaintenances);

module.exports = router;