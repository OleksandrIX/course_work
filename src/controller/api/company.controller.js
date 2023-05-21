const {CompanyRepo, ServicemanRepo} = require("../../domain");

const getCompanies = async (req, res) => {
    try {
        const companies = await CompanyRepo.getAllCompanies();
        res.json({companies, status: 200});
    } catch (err) {
        console.log("Error: ", err);
        res.json({message: err.message, status: 500});
    }
};

const getCompany = async (req, res) => {
    const {companyId} = req.params;
    try {
        const company = await CompanyRepo.getCompanyById(companyId);
        if (!company) return res.json({message: "Company not found", status: 404});
        res.json({company, status: 200});
    } catch (err) {
        console.log("Error: ", err);
        res.json({message: err.message, status: 500});
    }
};

const getServicemansInCompany = async (req, res) => {
    const {companyId} = req.params;
    try {
        const company = await CompanyRepo.getCompanyById(companyId);
        if (!company) return res.json({
            message: "Company not found",
            status: 404,
        });

        const servicemans = await ServicemanRepo.getAllServicemansInCompany(companyId);
        if (servicemans.length === 0) return res.json({
            message: "There are no servicemans in this home",
            status: 404,
        });

        res.json({company, servicemans, status: 200});
    } catch (err) {
        console.log("Error: ", err);
        res.json({message: err.message, status: 500});
    }
};

const addCompany = async (req, res) => {
    const companyData = req.body;
    companyData.name_company = companyData.name_company.trim();
    try {
        await CompanyRepo.createCompany(companyData);
        res.json({status: 200});
    } catch (err) {
        console.log("Error: ", err);
        res.json({message: err.message, status: 500});
    }
};

const editCompany = async (req, res) => {
    const {companyId} = req.params;
    const companyData = req.body;
    try {
        await CompanyRepo.updateCompany(companyId, companyData);
        res.json({status: 200});
    } catch (err) {
        console.log("Error: ", err);
        res.json({message: err.message, status: 500});
    }
};

const deleteCompany = async (req, res) => {
    const {companyId} = req.params;
    try {
        await CompanyRepo.deleteCompany(companyId);
        res.json({status: 200});
    } catch (err) {
        console.log("Error: ", err);
        res.json({message: err.message, status: 500});
    }
};

module.exports = {
    getCompanies,
    getCompany,
    getServicemansInCompany,
    addCompany,
    editCompany,
    deleteCompany,
};