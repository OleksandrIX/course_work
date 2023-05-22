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

const addWeaponMaintenance = async (req, res) => {
    const maintenanceData = req.body;
    for (const key of Object.keys(maintenanceData)) {
        if (typeof maintenanceData[key] === "string") maintenanceData[key] = maintenanceData[key].trim();
    }

    try {
        await WeaponMaintenanceRepo.createMaintenance(maintenanceData);
        res.json({status: 200});
    } catch (err) {
        console.log("Error: " + err.message);
        res.json({message: err.message, status: 500});
    }
};

const editMaintenance = async (req, res) => {
    const {maintenanceId} = req.params;
    const maintenanceData = req.body;
    try {
        await WeaponMaintenanceRepo.updateMaintenance(maintenanceId, maintenanceData);
        res.json({status: 200});
    } catch (err) {
        console.log("Error: " + err.message);
        res.json({message: err.message, status: 500});
    }
};

const deleteMaintenance = async (req, res) => {
    const {maintenanceId} = req.params;
    try {
        await WeaponMaintenanceRepo.deleteMaintenance(maintenanceId);
        res.json({status: 200});
    } catch (err) {
        console.log("Error: " + err.message);
        res.json({message: err.message, status: 500});
    }
};

module.exports = {
    getWeaponMaintenances,
    getWeaponMaintenance,
    addWeaponMaintenance,
    editMaintenance,
    deleteMaintenance,
};