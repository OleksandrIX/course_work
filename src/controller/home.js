const api = require("../config/api.config");

const getAllCompanyFromUser = async (req, res, next) => {
    let actionData = await getActionData(req.query,
        req.session?.passport.user,
        next);
    res.render("pages/home", {actionData});
};

const getActionData = async ({action, companyId, weaponId, servicemanId}, userId, next) => {
    const data = {};
    let company = {};
    let resultWeapons = [];
    let resultServicemans = [];

    switch (action) {
        case undefined:
            data.status = false;
            break;

        case "companies":
            company = await (await fetch(`${api.uri}/companies/${companyId}`)).json();

            if(company.status === 404) return next();
            if(company.status === 200) company = company.company;

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
            data.company = company;
            data.weapons = resultWeapons;
            data.servicemans = servicemans;
            break;

        case "weapon":
            company = await (await fetch(`${api.uri}/companies/${companyId}`)).json();

            if(company.status === 404) return next();
            if(company.status === 200) company = company.company;

            data.status = true;
            data.action = action;
            data.company = company;
            data.weapon = (await (await fetch(`${api.uri}/weapons/${weaponId}`)).json()).weapon || {};
            data.serviceman = (await (await fetch(`${api.uri}/servicemans/${data.weapon.serviceman_id}`)).json()).serviceman || {};
            data.maintenances = (await (await fetch(`${api.uri}/weapons/${weaponId}/maintenances`)).json()).maintenances || [];
            break;

        case "serviceman":
            company = await (await fetch(`${api.uri}/companies/${companyId}`)).json();

            if(company.status === 404) return next();
            if(company.status === 200) company = company.company;

            data.status = true;
            data.action = action;
            data.company = company;
            data.serviceman = (await (await fetch(`${api.uri}/servicemans/${servicemanId}`)).json()).serviceman || {};
            break;

        case "add-weapon":
            company = await (await fetch(`${api.uri}/companies/${companyId}`)).json();

            if(company.status === 404) return next();
            if(company.status === 200) company = company.company;

            resultServicemans = [];
            const weaponsData = await (await fetch(`${api.uri}/weapons`)).json();
            const servicemansData = await (await fetch(`${api.uri}/servicemans`)).json();

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
            data.company = company;
            data.servicemans = resultServicemans;
            break;

        case "add-serviceman":
            company = await (await fetch(`${api.uri}/companies/${companyId}`)).json();

            if(company.status === 404) return next();
            if(company.status === 200) company = company.company;

            data.status = true;
            data.action = action;
            data.company = company;
            break;

        case "edit-weapon":
            data.status = true;
            data.action = action;
            break;

        case "edit-serviceman":
            data.status = true;
            data.action = action;
            data.serviceman = (await (await fetch(`${api.uri}/servicemans/${servicemanId}`)).json()).serviceman || {}
            break;

        default:
            data.status = false;
            console.log("There is no such action");
    }

    const companiesData = await (await fetch(`${api.uri}/users/${userId}/companies`)).json();
    data.companies = companiesData.status === 200 ? companiesData.companies : [];

    return data;
};


module.exports = {
    getAllCompanyFromUser,
};