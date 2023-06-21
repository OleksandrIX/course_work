const axios = require("axios");
const {internalServerError, notFoundError} = require("./error");
const Auth = require("../util/auth");
const api = require("../util/api");

module.exports.getMainPage = async (req, res) => {
    try {
        const isAdmin = await Auth.isAdmin(req.user);
        if (isAdmin) {
            const users = (await axios.get(api.user)).data.users;
            const garrisons = (await axios.get(api.garrison)).data.garrisons;
            res.render("pages/admin", {
                isAdmin,
                users,
                garrisons
            });
        } else {
            const {passport} = req.session;
            const userId = passport.user;
            const {user: {username, garrisons}} = (await axios.get(api.user + `/${userId}`)).data;
            res.render("pages/main", {
                isAdmin,
                username,
                garrisons
            });
        }
    } catch (err) {
        console.log(err.message);
        internalServerError(res);
    }
};

module.exports.getGarrisonPage = async (req, res) => {
    const {garrisonId} = req.params;
    try {
        const garrison = (await axios.get(api.garrison + `/${garrisonId}`)).data.garrison;
        const militaryUnits = (await axios.get(api.militaryUnit + `?garrisonId=${garrisonId}`)).data.militaryUnits;

        let servicemen = [];
        militaryUnits.forEach((militaryUnit) => {
            militaryUnit["location_servicemans"]
                .forEach(({servicemanId}) => {
                    servicemen.push(servicemanId);
                });
        });

        servicemen = await mapServiceman(servicemen);

        res.render("pages/garrison", {
            name: garrison.nameGarrison,
            militaryUnits: militaryUnits,
            garrison,
            servicemen,
        });
    } catch (err) {
        if (err.response && err.response.status === 404)
            return notFoundError(res, "Гарнізону не знайдено");

        console.log(err.message);
        internalServerError(res);
    }
};

module.exports.getServicemanPage = async (req, res) => {
    const {garrisonId,servicemanId} = req.params;
    try {
        const garrison = (await axios.get(api.garrison + `/${garrisonId}`)).data.garrison;
        const serviceman = (await axios.get(api.serviceman + `/${servicemanId}`)).data.serviceman;
        const {currentLocation, permanentLocation} = await getDataForCurrentAndPermanentLocation(serviceman);

        res.render("pages/serviceman", {
            name: `${serviceman.lastName} ${serviceman.firstName[0].toUpperCase()}.${serviceman.middleName[0].toUpperCase()}.`,
            garrison,
            serviceman,
            currentLocation,
            permanentLocation,
        });
    } catch (err) {
        if (err.response && err.response.status === 404)
            return notFoundError(res, "Військовослужбовця не знайдено");

        console.log(err.message);
        internalServerError(res);
    }
};

const getDataForCurrentAndPermanentLocation = async (serviceman) => {
    const {location_serviceman: {currentMilitaryUnitId, permanentMilitaryUnitId}} = serviceman;
    const currentMilitaryUnit = (await axios.get(api.militaryUnit + `/${currentMilitaryUnitId}`))
        .data.militaryUnit;
    const permanentMilitaryUnit = (await axios.get(api.militaryUnit + `/${permanentMilitaryUnitId}`))
        .data.militaryUnit;
    const currentGarrison = (await axios.get(api.garrison + `/${currentMilitaryUnit.garrisonId}`))
        .data.garrison;
    const permanentGarrison = (await axios.get(api.garrison + `/${permanentMilitaryUnit.garrisonId}`))
        .data.garrison;

    return createCurrentAndPermanentLocation(currentGarrison,
        permanentGarrison,
        currentMilitaryUnit,
        permanentMilitaryUnit);
};

const createCurrentAndPermanentLocation = (currentGarrison,
                                           permanentGarrison,
                                           currentMilitaryUnit,
                                           permanentMilitaryUnit) => {
    const currentLocation = {
        garrison: currentGarrison.id,
        militaryUnit: currentMilitaryUnit.id,
    };

    const permanentLocation = {
        garrison: permanentGarrison.id,
        militaryUnit: permanentMilitaryUnit.id,
    };

    return {currentLocation, permanentLocation};
};
const mapServiceman = async (servicemen) => {
    const result = [];
    for (let servicemanId of servicemen)
        result.push((await axios.get(api.serviceman + `/${servicemanId}`)).data.serviceman);
    return result;
};