const axios = require("axios");
const api = require("../../helper/api");
const {internalServerError, forbiddenError} = require("../error");

const isAdmin = async (currentUser) => (await currentUser).role === "ADMIN";
const getUnitFromCurrentUser = async (currentUser) => (await currentUser).unit.id;

module.exports.getMainPage = async (req, res) => {
    try {
        const admin = await isAdmin(req.user);
        if (admin) {
            let units = [], users = [];
            const responseUnits = await axios.get(api.getUnits),
                responseUsers = await axios.get(api.getUsers);
            if (responseUnits.status === 200) units = responseUnits.data.units;
            if (responseUsers.status === 200) users = responseUsers.data.users;
            res.render("pages/admin", {units, users});
        } else {
            let unit = {};
            const user = await req.user;
            const responseUnit = await axios.get(api.getUnits + `/${user.unit.id}`);
            if (responseUnit.status === 200) unit = responseUnit.data.unit;
            res.render("pages/main", {unit, isAdmin: admin});
        }
    } catch (err) {
        console.log("Error: " + err);
        internalServerError(req, res);
    }
};

module.exports.getUnitPage = async (req, res) => {
    let unit = {};
    const {unitId} = req.params;
    try {
        const admin = await isAdmin(req.user);
        if (admin) {
            const responseUnit = await axios.get(api.getUnits + `/${unitId}`);
            if (responseUnit.status === 200) unit = responseUnit.data.unit;
            res.render("pages/main", {unit, isAdmin: admin});
        } else {
            res.status(200).redirect("/");
        }
    } catch (err) {
        console.log("Error: " + err);
        internalServerError(req, res);
    }
};

module.exports.getPersonnelPage = async (req, res) => {
    let personnel = {};
    const {personnelId} = req.params;
    try {
        const admin = await isAdmin(req.user);
        const responsePersonnel = await axios.get(api.getPersonnel + `/${personnelId}`);
        if (responsePersonnel.status === 200) personnel = responsePersonnel.data.personnel;
        if (admin ||
            await getUnitFromCurrentUser(req.user) === personnel.unitId) {
            res.render("pages/personnel", {personnel, isAdmin: admin});
        } else {
            forbiddenError(req, res);
        }
    } catch (err) {
        console.log("Error: " + err);
        internalServerError(req, res);
    }
};