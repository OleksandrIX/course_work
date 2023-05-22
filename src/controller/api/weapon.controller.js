const {WeaponRepo, WeaponMaintenanceRepo, ServicemanRepo} = require("../../domain");

const getWeapons = async (req, res) => {
    try {
        const weapons = await WeaponRepo.getAllWeapons();
        res.json({weapons, status: 200});
    } catch (err) {
        console.log("Error: " + err.message);
        res.json({message: err.message, status: 500});
    }
};

const getWeapon = async (req, res) => {
    const {weaponId} = req.params;
    try {
        const weapon = await WeaponRepo.getWeaponById(weaponId);
        if (!weapon) return res.json({message: "Weapon not found", status: 404});
        res.json({weapon, status: 200});
    } catch (err) {
        console.log("Error: " + err.message);
        res.json({message: err.message, status: 500});
    }
};

const getWeaponMaintenances = async (req, res) => {
    const {weaponId} = req.params;
    try {
        const maintenances = await WeaponMaintenanceRepo.getMaintenancesByWeaponId(weaponId);
        res.json({maintenances, status: 200});
    } catch (err) {
        console.log("Error: " + err.message);
        res.json({message: err.message, status: 500});
    }
};

const addWeapon = async (req, res) => {
    const weaponData = req.body;
    for (const key of Object.keys(weaponData)) {
        if (typeof weaponData[key] === "string") weaponData[key] = weaponData[key].trim();
    }

    try {
        await WeaponRepo.createWeapon(weaponData);
        res.json({status: 200});
    } catch (err) {
        console.log("Error: " + err.message);
        res.json({message: err.message, status: 500});
    }
};

const editWeapon = async (req, res) => {
    const {weaponId} = req.params;
    const weaponData = req.body;
    try {
        await WeaponRepo.updateWeapon(weaponId, weaponData);
        res.json({status: 200});
    } catch (err) {
        console.log("Error: " + err.message);
        res.json({message: err.message, status: 500});
    }
};

const deleteWeapon = async (req, res) => {
    const {weaponId} = req.params;
    try {
        await WeaponRepo.deleteWeapon(weaponId);
        res.json({status: 200});
    } catch (err) {
        console.log("Error: " + err.message);
        res.json({message: err.message, status: 500});
    }
};

module.exports = {
    getWeapons,
    getWeapon,
    getWeaponMaintenances,
    addWeapon,
    editWeapon,
    deleteWeapon,
};