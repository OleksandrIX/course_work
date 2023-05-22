const api = require("../config/api.config");

const getAllCompanyFromUser = async (req, res, next) => {
    let actionData = await getActionData(req.query,
        req.session?.passport.user,
        next);
    res.render("pages/home", {actionData});
};

const getActionData = async ({action, companyId, weaponId, servicemanId, maintenanceId}, userId, next) => {
    const data = {};
    let resultWeapons = [];
    let resultServicemans = [];
    let weaponsData;
    let servicemansData;
    let company = companyId ? await (await fetch(`${api.uri}/companies/${companyId}`)).json() : {};

    if (company.status === 404) return next();
    if (company.status === 200) company = company.company;

    switch (action) {
        case undefined:
            data.status = false;
            break;

        case "companies":
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

    const companiesData = await (await fetch(`${api.uri}/users/${userId}/companies`)).json();
    data.companies = companiesData.status === 200 ? companiesData.companies : [];
    data.company = company;

    return data;
};


module.exports = {
    getAllCompanyFromUser,
};