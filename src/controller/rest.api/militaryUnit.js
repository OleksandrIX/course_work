const {MilitaryUnitService} = require("../../service");
const {apiError} = require("../error");

module.exports.getAllMilitaryUnits = async (req, res) => {
    const {garrisonId} = req.query;
    try {
        if (garrisonId) {
            const militaryUnits = await MilitaryUnitService.findAllByGarrisonId(garrisonId);
            res.status(200).json({militaryUnits});
        } else {
            const militaryUnits = await MilitaryUnitService.findAll();
            res.status(200).json({militaryUnits});
        }
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};

module.exports.getOneMilitaryUnitById = async (req, res) => {
    const {militaryUnitId} = req.params;
    try {
        const militaryUnit = await MilitaryUnitService.findById(militaryUnitId);
        if (!militaryUnit) return apiError(res, 404, "Military unit with this ID was not found");
        res.status(200).json({militaryUnit});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};

module.exports.createMilitaryUnit = async (req, res) => {
    const militaryUnitData = req.body;
    try {
        if (await MilitaryUnitService.isExistsByName(militaryUnitData.nameMilitaryUnit))
            return apiError(res, 409, "В/ч з такою назвою вже існує");

        const militaryUnit = await MilitaryUnitService.save(militaryUnitData);
        res.status(201).json({militaryUnit});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};

module.exports.updateMilitaryUnit = async (req, res) => {
    const {militaryUnitId} = req.params;
    const militaryUnitData = req.body;
    try {
        let militaryUnit = await MilitaryUnitService.findById(militaryUnitId);
        if (!militaryUnit) return apiError(res, 404, "Military unit with this ID was not found");

        if (militaryUnitData.nameMilitaryUnit && militaryUnit.nameMilitaryUnit !== militaryUnitData.nameMilitaryUnit &&
            await MilitaryUnitService.isExistsByName(militaryUnitData.nameMilitaryUnit))
            return apiError(res, 409, "В/ч з такою назвою вже існує");

        militaryUnit = await MilitaryUnitService.update(militaryUnitId, militaryUnitData);
        res.status(200).json({militaryUnit});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};

module.exports.deleteMilitaryUnit = async (req, res) => {
    const {militaryUnitId} = req.params;
    try {
        if(!await MilitaryUnitService.isExistsById(militaryUnitId))
            return apiError(res, 404, "Military unit with this ID was not found");

        await MilitaryUnitService.destroy(militaryUnitId);
        res.status(200).json({message: "Military unit deleted successfully"});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};