const {ServicemanRepo, WeaponRepo} = require("../../domain");

const getServicemans = async (req, res) => {
    try {
        const servicemans = await ServicemanRepo.getAllServicemans();
        res.json({servicemans, status: 200});
    } catch (err) {
        console.log("Error: " + err.message);
        res.json({message: err.message, status: 500});
    }
};

const getServiceman = async (req, res) => {
    const {servicemanId} = req.params;
    try {
        const serviceman = await ServicemanRepo.getServicemanById(servicemanId);
        if (!serviceman) return res.json({message: "Serviceman not found", status: 404});
        res.json({serviceman, status: 200});
    } catch (err) {
        console.log("Error: " + err.message);
        res.json({message: err.message, status: 500});
    }
};

const getWeaponServiceman = async (req, res) => {
    const {servicemanId} = req.params;
    try {
        const weapon = await WeaponRepo.getWeaponByServicemanId(servicemanId);
        if (!weapon) return res.json({message: "Weapon not found", status: 404});
        res.json({weapon, status: 200});
    } catch (err) {
        console.log("Error: " + err.message);
        res.json({message: err.message, status: 500});
    }
};

const addServicemans = async (req, res) => {
    const servicemanData = req.body;
    for (const key of Object.keys(servicemanData)) {
        if (typeof servicemanData[key] === "string") servicemanData[key] = servicemanData[key].trim();
    }

    try {
       await ServicemanRepo.createServiceman(servicemanData);
       res.json({status: 200});
    } catch (err) {
        console.log("Error: " + err.message);
        res.json({message: err.message, status: 500});
    }
};

const editServicemans = async (req, res) => {

};

const deleteServicemans = async (req, res) => {

};

module.exports = {
    getServicemans,
    getServiceman,
    getWeaponServiceman,
    addServicemans,
    editServicemans,
    deleteServicemans,
};