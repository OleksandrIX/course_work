const {ServicemanService} = require("../../service");
const {apiError} = require("../error");

module.exports.getAllServicemen = async (req, res) => {
    try {
        const servicemen = await ServicemanService.findAll();
        res.status(200).json({servicemen});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};

module.exports.getOneServicemanById = async (req, res) => {
    const {servicemanId} = req.params;
    try {
        const serviceman = await ServicemanService.findById(servicemanId);
        if (!serviceman) return apiError(res, 404, "Serviceman with this ID was not found");
        res.status(200).json({serviceman});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};

module.exports.createServicemen = async (req, res) => {
    const servicemanData = req.body;
    try {
        const serviceman = await ServicemanService.save(servicemanData);
        res.status(201).json({serviceman});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};

module.exports.updateServicemen = async (req, res) => {
    const {servicemanId} = req.params;
    const servicemanData = req.body;
    try {
        if (!await ServicemanService.isExistsById(servicemanId))
            return apiError(res, 404, "Serviceman with this ID was not found");

        const serviceman = await ServicemanService.update(servicemanId, servicemanData);
        res.status(200).json({serviceman});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};

module.exports.deleteServicemen = async (req, res) => {
    const {servicemanId} = req.params;
    try {
        if (!await ServicemanService.isExistsById(servicemanId))
            return apiError(res, 404, "Serviceman with this ID was not found");

        await ServicemanService.destroy(servicemanId);
        res.status(200).json({message: "Serviceman deleted successfully"});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};
