const api = require("../config/api.config");
const {internalServerError} = require("./error");

const isAdmin = async (req) => {
    const user = await req.user;
    return user.role === "ADMIN";
};

const getHomePage = async (req, res) => {
    let units = [];
    try {
        const resData = await fetch(api.url + "/units");
        if (resData.status === 200) units = (await resData.json()).units;
        res.render("pages/user/home.ejs", {
            isAdmin: await isAdmin(req),
            units,
        });
    } catch (err) {
        console.log("Error: ", err.message);
        internalServerError(req, res);
    }
};

const getUnitPage = async (req, res) => {
    let unit = {};
    let personnelOfUnit = [];
    const {unitId} = req.params;
    try {
        const unitData = await fetch(api.url + `/units/${unitId}`);
        if (unitData.status === 200) unit = (await unitData.json()).unit;

        const personnelData = await fetch(api.url + `/units/${unitId}/personnel`);
        if (personnelData.status === 200) personnelOfUnit = (await personnelData.json()).personnel;
        res.render("pages/user/unit.ejs", {
            isAdmin: await isAdmin(req),
            nameUnit: unit.name_unit,
            personnelOfUnit,
        });
    } catch (err) {
        console.log("Error: ", err.message);
        internalServerError(req, res);
    }
};

const getPersonnelPage = async (req, res) => {
    let personnel = {};
    const {unitId, personnelId} = req.params;
    try {
        const personnelData = await fetch(api.url + `/personnel/${personnelId}`);
        if (personnelData.status === 200) personnel = (await personnelData.json()).personnel;

        const namePersonnel = `${personnel.last_name} ${personnel.first_name[0].toUpperCase()}.${personnel.middle_name[0].toUpperCase()}.`;
        res.render("pages/user/personnel.ejs", {
            isAdmin: await isAdmin(req),
            name: namePersonnel,
            personnel,
        });
    } catch (err) {
        console.log("Error: ", err.message);
        internalServerError(req, res);
    }
};

module.exports = {
    getHomePage,
    getUnitPage,
    getPersonnelPage,
};