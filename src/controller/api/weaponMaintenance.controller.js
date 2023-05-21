const {WeaponMaintenanceRepo} = require("../../domain");

const getWeaponMaintenances = async (req, res) => {
    try {
        const maintenance = await WeaponMaintenanceRepo.getAllMaintenances();
        res.json({maintenance, status:200});
    } catch (err) {
        console.log("Error: ", err.message);
        res.json({message: err.message, status: 500});
    }
};

const getWeaponMaintenance = async (req, res) => {
    const {maintenanceId} = req.params;
    try {
        const maintenance = await WeaponMaintenanceRepo.getMaintenanceById(maintenanceId);
        if (!maintenance) return res.json({message: "Maintenance not found", status: 404});
        res.json({maintenance, status: 200});
    } catch (err) {
        console.log("Error: " + err.message);
        res.json({message: err.message, status: 500});
    }
};

module.exports = {
    getWeaponMaintenances,
    getWeaponMaintenance,
};