const api = require("../config/api.config");

const getAdminPage = async (req, res) => {
    const type = req.query.type;
    let actionData = {};
    switch (type) {
        case undefined:
            actionData.status = false;
            break;
        case "user":
            actionData = await getActionDataUser(req.query);
            actionData.type = "user";
            break;
        case "company":
            actionData = await getActionDataCompany(req.query);
            actionData.type = "company";
            break;
        default:
            console.log("There is no such type");
    }
    res.render("pages/admin", {
        actionData,
    });
};

const getActionDataUser = async ({action, userId}) => {
    const data = {};
    let users = await (await fetch(`${api.uri}/users`)).json();
    users = users.status === 200 ? users.users : [];

    switch (action) {
        case undefined:
            data.status = false;
            break;
        case "users":
            data.status = true;
            data.action = action;
            data.users = getUsersWithoutAdmin(users);
            break;
        case "add-user":
            data.status = true;
            data.action = action;
            data.users = users;
            break;
        case "edit-user":
            data.status = true;
            data.action = action;
            data.user = userId ? (await (await fetch(`${api.uri}/users/${userId}`)).json()).user : {};
            break;
        default:
            data.status = false;
            console.log("There is no such action");
    }
    return data;
};

const getActionDataCompany = async ({action, companyId}) => {
    const data = {};

    let companiesData = await (await fetch(`${api.uri}/companies`)).json();
    companiesData = companiesData.status === 200 ? companiesData.companies : [];

    const dataUsers = await (await fetch(`${api.uri}/users`)).json();
    let users = dataUsers.status === 200 ? getUsersWithoutAdmin(dataUsers.users) : [];

    const companies = [];
    for (const company of companiesData) {
        const user = (await (await fetch(`${api.uri}/users/${company.user_id}`)).json()).user;
        companies.push({user: user.username, company: company});
    }

    switch (action) {
        case undefined:
            data.status = false;
            break;
        case "companies":
            data.status = true;
            data.action = action;
            data.companies = companies;
            break;
        case "add-company":
            data.status = true;
            data.action = action;
            data.users = users;
            data.companies = companies;
            break;
        case "edit-company":
            data.status = true;
            data.action = action;
            data.users = users;
            data.company = companyId ? (await (await fetch(`${api.uri}/companies/${companyId}`)).json()).company : {};
            break;
        default:
            data.status = false;
            console.log("There is no such action");
    }
    return data;
};

const getUsersWithoutAdmin = (users) => {
    const resultUsers = [];
    users.forEach((user) => {
        if (user.role !== "ADMIN") resultUsers.push(user);
    });
    return resultUsers;
};

module.exports = {
    getAdminPage,
};