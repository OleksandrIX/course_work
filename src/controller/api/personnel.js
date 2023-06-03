const {PersonnelService, isExistsByLicenseNumber} = require("../../service");

module.exports.getAllPersonnel = async (req, res) => {
    try {
        const personnel = await PersonnelService.getAllPersonnel();
        res.status(200).json({personnel});
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({error: err.message});
    }
};

module.exports.getOnePersonnel = async (req, res) => {
    const {personnelId} = req.params;
    try {
        const personnel = await PersonnelService.getPersonnelById(personnelId);
        if (!personnel) return res.status(404).json({message: "Personnel not found"});
        res.status(200).json({personnel});
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({error: err.message});
    }
};

module.exports.createPersonnel = async (req, res) => {
    const personnelData = req.body;
    try {
        if (await isExistsByLicenseNumber(personnelData.licenseNumber))
            return res.status(409).json({
                message: "Такий номер посвідчення вже існує"
            });

        const personnel = await PersonnelService.savePersonnel(personnelData);
        res.status(201).json({message: "Personnel created successfully", personnel});
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({error: err.message});
    }
};

module.exports.editPersonnel = async (req, res) => {
    const {personnelId} = req.params;
    const personnelData = req.body;
    try {
        const personnel = await PersonnelService.getPersonnelById(personnelId);

        if (!await PersonnelService.isExistsById(personnelId))
            return res.status(404).json({
                message: "Personnel not found"
            });
        if (personnelData.licenseNumber && personnel.licenseNumber !== personnelData.licenseNumber &&
            await isExistsByLicenseNumber(personnel.licenseNumber))
            return res.status(409).json({
                message: "Такий номер посвідчення вже існує"
            });

        await PersonnelService.updatePersonnel(personnelId, personnelData);
        res.status(200).json({message: "Personnel updated successfully"});
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({error: err.message});
    }
};

module.exports.deletePersonnel = async (req, res) => {
    const {personnelId} = req.params;
    try {
        if (!await PersonnelService.isExistsById(personnelId))
            return res.status(404).json({
                message: "Personnel not found"
            });

        await PersonnelService.deletePersonnel(personnelId);
        res.status(200).json({message: "User deleted successfully"});
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({error: err.message});
    }
};

module.exports.editPersonalData = async (req, res) => {
    const {personalDataId} = req.params;
    const personalData = req.body;
    try {
        if(!(await PersonnelService.getPersonalData(personalDataId)))
            return res.status(404).json({
                message: "Personal data not found"
            });

        await PersonnelService.updatePersonalData(personalDataId, personalData);
        res.status(200).json({message: "Personal data updated successfully"});
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({error: err.message});
    }
};