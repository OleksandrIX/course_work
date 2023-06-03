const {UnitService, PersonnelService} = require("../../service");

module.exports.getUnits = async (req, res) => {
    try {
        const units = await UnitService.getAllUnits();
        res.status(200).json({units});
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({error: err.message});
    }
};

module.exports.getUnit = async (req, res) => {
    const {unitId} = req.params;
    try {
        const unit = await UnitService.getUnitById(unitId);
        if (!unit) return res.status(404).json({message: "Unit not found"});
        res.status(200).json({unit});
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({error: err.message});
    }
};

module.exports.createUnit = async (req, res) => {
    const unitData = req.body;
    try {
        const unit = await UnitService.saveUnit(unitData);
        res.status(201).json({message: "Unit created successfully", unit});
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({error: err.message});
    }
};

module.exports.editUnit = async (req, res) => {
    const {unitId} = req.params;
    const unitData = req.body;
    try {
        if (!await UnitService.isExistsById(unitId))
            return res.status(404).json({
                message: "Unit not found"
            });

        await UnitService.updateUnit(unitId, unitData);
        res.status(200).json({message: "Unit updated successfully"});
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({error: err.message});
    }
};

module.exports.deleteUnit = async (req, res) => {
    const {unitId} = req.params;
    try {
        if (!await UnitService.isExistsById(unitId))
            return res.status(404).json({
                message: "Unit not found"
            });

        await UnitService.deleteUnit(unitId);
        res.status(200).json({message: "Unit deleted successfully"});
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({error: err.message});
    }
};