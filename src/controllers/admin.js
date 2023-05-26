const api = require("../config/api.config");
const {internalServerError} = require("./error");

const getHomePage = (req, res) => {
    res.render("pages/admin/home");
};

const getUsersPage = async (req, res) => {
    let users = [];
    try {
        const resData = await fetch(api.url + "/users");
        if (resData.status === 200) users = (await resData.json()).users;
        res.render("pages/admin/users", {users});
    } catch (err) {
        console.log("Error: ", err.message);
        internalServerError(req, res);
    }
};

const getUnitsPage = async (req, res) => {
    let units = [];
    try {
        const resData = await fetch(api.url + "/units");
        if (resData.status === 200) units = (await resData.json()).units;
        res.render("pages/admin/units", {units});
    } catch (err) {
        console.log("Error: ", err.message);
        internalServerError(req, res);
    }
};

module.exports = {
    getHomePage,
    getUsersPage,
    getUnitsPage,
};