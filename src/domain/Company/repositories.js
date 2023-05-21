module.exports = (Company) => {
    const getCompanyById = (id) => {
        return Company.findOne({where: {id_company: id}});
    };

    const getAllCompaniesFromUser = (user_id)=>{
        return Company.findAll({where: {user_id}});
    };

    const getAllCompanies = () => {
        return Company.findAll({});
    };

    const createCompany = ({name_company, user_id}) => {
        return Company.create({name_company, user_id});
    };

    const updateCompany = (id, {name_company, user_id}) => {
        return Company.update(
            {name_company, user_id},
            {where: {id_company: id}},
        );
    }

    const deleteCompany = (id) => {
        return Company.destroy({where: {id_company: id}});
    };

    return {
        getCompanyById,
        getAllCompanies,
        getAllCompaniesFromUser,
        createCompany,
        updateCompany,
        deleteCompany,
    };
}