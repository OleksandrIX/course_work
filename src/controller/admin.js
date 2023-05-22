const api = require("../config/api.config");

const getAdminPage = async (req, res, next) => {
    const type = req.query.type;
    let actionData = {};
    switch (type) {
        case undefined:
            actionData.status = false;
            break;
        case "user":
            actionData = await getActionDataUser(req.query, next);
            actionData.type = "user";
            break;
        case "company":
            actionData = await getActionDataCompany(req.query, next);
            actionData.type = "company";
            break;
        default:
            console.log("There is no such type");
    }
    res.render("pages/admin", {
        actionData,
    });
};

const getActionDataUser = async ({action, userId}, next) => {
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
            data.user = userId ? await (await fetch(`${api.uri}/users/${userId}`)).json() : {};

            if (data.user.status === 404 || data.user.status === undefined) return next();
            if (data.user.status === 200) data.user = data.user.user;

            data.status = true;
            data.action = action;
            break;

        default:
            data.status = false;
            console.log("There is no such action");
    }
    return data;
};

const getActionDataCompany = async ({action, companyId, weaponId, servicemanId, maintenanceId}, next) => {
    const data = {};
    let resultWeapons = [];
    let resultServicemans = [];
    let weaponsData;
    let servicemansData;

    let companiesData = await (await fetch(`${api.uri}/companies`)).json();
    companiesData = companiesData.status === 200 ? companiesData.companies : [];

    const dataUsers = await (await fetch(`${api.uri}/users`)).json();
    let users = dataUsers.status === 200 ? getUsersWithoutAdmin(dataUsers.users) : [];

    const companies = [];
    for (const company of companiesData) {
        const user = (await (await fetch(`${api.uri}/users/${company.user_id}`)).json()).user;
        companies.push({user: user.username, company: company});
    }

    data.company = companyId ? await (await fetch(`${api.uri}/companies/${companyId}`)).json() : {};
    if (data.company.status === 404) return next();
    if (data.company.status === 200) data.company = data.company.company;

    switch (action) {
        case undefined:
            data.status = false;
            break;

        case "companies":
            data.status = true;
            data.action = action;
            data.companies = companies;
            break;

        case "company":
            let servicemans =
                (await (await fetch(`${api.uri}/companies/${companyId}/servicemans`)).json()).servicemans || [];

            resultWeapons = [];
            for (const serviceman of servicemans) {
                let weapon = await (await fetch(`${api.uri}/servicemans/${serviceman.id_serviceman}/weapons`)).json();
                weapon = weapon.status === 200 ? weapon.weapon : {};
                if (Object.keys(weapon).length !== 0)

                    resultWeapons.push({
                        serviceman: {
                            id_serviceman: serviceman.id_serviceman,
                            first_name: serviceman.first_name,
                            last_name: serviceman.last_name,
                            middle_name: serviceman.middle_name,
                            military_rank: serviceman.military_rank,
                        },
                        weapon: {
                            id_weapon: weapon.id_weapon,
                            name_weapon: weapon.name_weapon,
                            serial_number: weapon.serial_number,
                        },
                    });
            }

            data.status = true;
            data.action = action;
            data.weapons = resultWeapons;
            data.servicemans = servicemans;
            break;

        case "add-company":
            data.status = true;
            data.action = action;
            data.users = users;
            data.companies = companies;
            break;

        case "edit-company":
            data.company = companyId ? await (await fetch(`${api.uri}/companies/${companyId}`)).json() : {};

            if (data.company.status === 404 || data.company.status === undefined) return next();
            if (data.company.status === 200) data.company = data.company.company;

            data.status = true;
            data.action = action;
            data.users = users;
            break;

        case "weapon":
            data.weapon = await (await fetch(`${api.uri}/weapons/${weaponId}`)).json();
            data.serviceman = await (await fetch(`${api.uri}/servicemans/${data.weapon.weapon.serviceman_id}`)).json();
            data.maintenances = await (await fetch(`${api.uri}/weapons/${weaponId}/maintenances`)).json();

            if (data.weapon.status === 404 || data.serviceman.status === 404 || data.maintenances.status === 404) return next();
            if (data.weapon.status === 200 && data.serviceman.status === 200 && data.maintenances.status === 200) {
                data.weapon = data.weapon.weapon;
                data.serviceman = data.serviceman.serviceman;
                data.maintenances = data.maintenances.maintenances;
            }

            data.status = true;
            data.action = action;
            break;

        case "serviceman":
            data.serviceman = await (await fetch(`${api.uri}/servicemans/${servicemanId}`)).json();

            if (data.serviceman.status === 404) return next();
            if (data.serviceman.status === 200) data.serviceman = data.serviceman.serviceman;

            data.status = true;
            data.action = action;
            break;

        case "add-weapon":
            resultServicemans = [];
            weaponsData = await (await fetch(`${api.uri}/weapons`)).json();
            servicemansData = await (await fetch(`${api.uri}/servicemans`)).json();

            if (weaponsData.status === 200)
                resultWeapons = weaponsData.weapons.map((weapon) => {
                    return {
                        name_weapon: weapon.name_weapon,
                        serial_number: weapon.serial_number,
                        serviceman_id: weapon.serviceman_id,
                    };
                })


            if (servicemansData.status === 200)
                for (const serviceman of servicemansData.servicemans) {
                    const isExist = resultWeapons.some((weapon) => weapon.serviceman_id === serviceman.id_serviceman);
                    if (!isExist)
                        resultServicemans.push({
                            id_serviceman: serviceman.id_serviceman,
                            first_name: serviceman.first_name,
                            last_name: serviceman.last_name,
                            middle_name: serviceman.middle_name,
                            military_rank: serviceman.military_rank,
                        });
                }

            data.status = true;
            data.action = action;
            data.servicemans = resultServicemans;
            break;

        case "add-serviceman":
            data.status = true;
            data.action = action;
            break;

        case "add-maintenance":
            data.weapon = await (await fetch(`${api.uri}/weapons/${weaponId}`)).json();

            if (data.weapon.status === 404) return next();
            if (data.weapon.status === 200) data.weapon = data.weapon.weapon;

            data.status = true;
            data.action = action;
            break;

        case "edit-weapon":
            data.weapon = await (await fetch(`${api.uri}/weapons/${weaponId}`)).json();

            if (data.weapon.status === 404) return next();
            if (data.weapon.status === 200) data.weapon = data.weapon.weapon;

            resultServicemans = [];
            weaponsData = await (await fetch(`${api.uri}/weapons`)).json();
            servicemansData = await (await fetch(`${api.uri}/servicemans`)).json();

            if (weaponsData.status === 200)
                resultWeapons = weaponsData.weapons.map((weapon) => {
                    return {
                        name_weapon: weapon.name_weapon,
                        serial_number: weapon.serial_number,
                        serviceman_id: weapon.serviceman_id,
                    };
                })


            if (servicemansData.status === 200)
                for (const serviceman of servicemansData.servicemans) {
                    const isExist = resultWeapons.some((weapon) => weapon.serviceman_id === serviceman.id_serviceman);
                    if (!isExist)
                        resultServicemans.push({
                            id_serviceman: serviceman.id_serviceman,
                            first_name: serviceman.first_name,
                            last_name: serviceman.last_name,
                            middle_name: serviceman.middle_name,
                            military_rank: serviceman.military_rank,
                        });
                    if (data.weapon.serviceman_id === serviceman.id_serviceman) {
                        resultServicemans.push({
                            id_serviceman: serviceman.id_serviceman,
                            first_name: serviceman.first_name,
                            last_name: serviceman.last_name,
                            middle_name: serviceman.middle_name,
                            military_rank: serviceman.military_rank,
                        });
                    }
                }


            data.status = true;
            data.action = action;
            data.servicemans = resultServicemans;
            break;

        case "edit-serviceman":
            data.status = true;
            data.action = action;
            data.serviceman = (await (await fetch(`${api.uri}/servicemans/${servicemanId}`)).json()).serviceman || {};
            break;

        case "edit-maintenance":
            data.status = true;
            data.action = action;
            data.maintenance = (await (await fetch(`${api.uri}/maintenances/${maintenanceId}`)).json()).maintenance || {};
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