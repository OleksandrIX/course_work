const {GarrisonService} = require("../../service");
const {apiError} = require("../error");

module.exports.getAllGarrison = async (req, res) => {
    const {userId} = req.query;
    try {
        if (userId) {
            const garrisons = await GarrisonService.findAllByUserId(userId);
            res.status(200).json({garrisons});
        } else {
            const garrisons = await GarrisonService.findAll();
            res.status(200).json({garrisons});
        }
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};

module.exports.getOneGarrisonById = async (req, res) => {
    const {garrisonId} = req.params;
    try {
        const garrison = await GarrisonService.findById(garrisonId);
        if (!garrison) return apiError(res, 404, "Garrison with this ID was not found");
        res.status(200).json({garrison});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};

module.exports.createGarrison = async (req, res) => {
    const garrisonData = req.body;
    try {
        if (await GarrisonService.isExistsByName(garrisonData.nameGarrison))
            return apiError(res, 409, "Гарнізон з такою назвою вже існує");

        const garrison = await GarrisonService.save(garrisonData);
        res.status(201).json({garrison});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};

module.exports.updateGarrison = async (req, res) => {
    const {garrisonId} = req.params;
    const garrisonData = req.body;
    try {
        let garrison = await GarrisonService.findById(garrisonId);
        if (!garrison) return apiError(res, 404, "Garrison with this ID was not found");

        if (garrisonData.nameGarrison && garrison.nameGarrison !== garrisonData.nameGarrison &&
            await GarrisonService.isExistsByName(garrisonData.nameGarrison))
            return apiError(res, 409, "Гарнізон з такою назвою вже існує");

        garrison = await GarrisonService.update(garrisonId, garrisonData);
        res.status(200).json({garrison});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};

module.exports.deleteGarrison = async (req, res) => {
    const {garrisonId} = req.params;
    try {
        if(!await GarrisonService.isExistsById(garrisonId))
            return apiError(res, 404, "Garrison with this ID was not found");

        await GarrisonService.destroy(garrisonId);
        res.status(200).json({message: "Garrison deleted successfully"});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};