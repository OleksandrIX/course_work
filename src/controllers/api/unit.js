const {UnitService, PersonnelService} = require("../../services");

const getUnits = async (req, res) => {
    try {
        const units = await UnitService.getUnitAll();
        res.status(200).json({units});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const getUnit = async (req, res) => {
    const {unitId} = req.params;
    try {
        const unit = await UnitService.getUnitById(unitId);
        if (!unit) return res.status(404).json({message: "Unit not found"});
        res.status(200).json({unit});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const createUnit = async (req, res) => {
    const {name_unit} = req.body;
    try {
        if (await UnitService.isExistsByName(name_unit))
            return res.status(409).json({
                message: "Unit with that name already exists"
            });

        const unit = await UnitService.createUnit({name_unit});
        res.status(201).json({message: "Unit created successfully", unit});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const updateUnit = async (req, res) => {
    const {unitId} = req.params;
    const unitData = req.body;
    try {
        if (!await UnitService.isExistsById(unitId))
            return res.status(404).json({
                message: "Unit not found"
            });

        if (unitData.name_unit)
            if (await UnitService.isExistsByName(unitData.name_unit))
                return res.status(409).json({
                    message: "Unit with that name already exists"
                });

        await UnitService.updateUnit(unitId, unitData);
        res.status(200).json({message: "Unit updated successfully"});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const deleteUnit = async (req, res) => {
    const {unitId} = req.params;
    try {
        if (!await UnitService.isExistsById(unitId))
            return res.status(404).json({
                message: "Unit not found"
            });

        await UnitService.deleteUnit(unitId);
        res.status(200).json({message: "Unit deleted successfully"});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const getPersonnelOfUnit = async (req, res) => {
    const {unitId} = req.params;
    try {
        const unit = await UnitService.getUnitById(unitId);
        if (!unit) return res.status(404).json({message: "Unit not found"});

        const personnel = await UnitService.getPersonnelOfUnit(unitId);
        res.status(200).json({unit, personnel});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getUnits,
    getUnit,
    createUnit,
    updateUnit,
    deleteUnit,
    getPersonnelOfUnit,
};