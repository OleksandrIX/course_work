const api = require("../config/api.config");
const {internalServerError} = require("./error");

const checkAdmin = async (req) => {
    const user = await req.user;
    return user.role === "ADMIN";
};

const getHomePage = async (req, res) => {
    try {
        const isAdmin = await checkAdmin(req);
        res.render("pages/home", {
            isAdmin,
        });
    } catch (err) {
        console.log("Error: ", err.message);
        internalServerError(req, res);
    }
};

const getDocumentOrdersPage = async (req, res) => {
    let orders;
    try {
        const isAdmin = await checkAdmin(req);
        const resData = await fetch(api.url + "/documents/?type=1");
        if (resData.status === 200) orders = (await resData.json()).documents;
        res.render("pages/orders", {
            orders,
            isAdmin,
        });
    } catch (err) {
        console.log("Error: ", err.message);
        internalServerError(req, res);
    }
};

const getDocumentInstructionsPage = async (req, res) => {
    let instructions;
    try {
        const isAdmin = await checkAdmin(req);
        const resData = await fetch(api.url + "/documents/?type=2");
        if (resData.status === 200) instructions = (await resData.json()).documents;
        res.render("pages/instructions", {
            instructions,
            isAdmin,
        });
    } catch (err) {
        console.log("Error: ", err.message);
        internalServerError(req, res);
    }
};

const getDocumentPage = async (req, res) => {
    let doc;
    const {documentId} = req.params;
    try {
        const isAdmin = await checkAdmin(req);
        let resData = await fetch(api.url + `/documents/${documentId}`);
        if (resData.status === 200) doc = (await resData.json()).document;
        res.render("pages/document", {
            doc,
            isAdmin,
        });
    } catch (err) {
        console.log("Error: ", err.message);
        internalServerError(req, res);
    }

};

const getUsersPage = async (req, res) => {
    let users = [];
    try {
        const resData = await fetch(api.url + "/users");
        if (resData.status === 200) users = (await resData.json()).users;
        res.render("pages/users", {
            users
        });
    } catch (err) {
        console.log("Error: ", err.message);
        internalServerError(req, res);
    }
};

module.exports = {
    getHomePage,
    getDocumentOrdersPage,
    getDocumentInstructionsPage,
    getDocumentPage,
    getUsersPage,
};