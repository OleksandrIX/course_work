const {PersonnelService} = require("../../services");
const getAllPersonnel = async (req, res) => {
    try {
        const personnel = await PersonnelService.getAllPersonnel();
        res.status(200).json({personnel});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const getPersonnel = async (req, res) => {
    const {personnelId} = req.params;
    try {
        const personnel = await PersonnelService.getPersonnelById(personnelId);
        if (!personnel) return res.status(404).json({message: "Personnel not found"});
        res.status(200).json({personnel});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const createPersonnel = async (req, res) => {
    const personnelData = req.body;
    try {
        await PersonnelService.createPersonnel(personnelData);
        res.status(201).json({message: "Personnel created successfully"});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const updatePersonnel = async (req, res) => {
    const {personnelId} = req.params;
    const personnelData = req.body;
    try {
        if (!await PersonnelService.isExistsById(personnelId))
            return res.status(404).json({
                message: "Personnel not found"
            });

        await PersonnelService.updatePersonnel(personnelId, personnelData);
        res.status(200).json({message: "Personnel updated successfully"});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const deletePersonnel = async (req, res) => {
    const {personnelId} = req.params;
    try {
        if (!await PersonnelService.isExistsById(personnelId))
            return res.status(404).json({
                message: "Personnel not found"
            });

        await PersonnelService.deletePersonnel(personnelId);
        res.status(200).json({message: "Personnel deleted successfully"});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getAllPersonnel,
    getPersonnel,
    createPersonnel,
    updatePersonnel,
    deletePersonnel,
};