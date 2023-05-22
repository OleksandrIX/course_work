module.exports = (Serviceman) => {
    const getServicemanById = (id) => {
        return Serviceman.findOne({where: {id_serviceman: id}});
    };

    const getAllServicemans = () => {
        return Serviceman.findAll({});
    };

    const getAllServicemansInCompany = async (company_id) => {
        return Serviceman.findAll({where: {company_id}});
    };

    const createServiceman = ({first_name, last_name, middle_name, birth_date, military_rank, position, company_id}) => {
        return Serviceman.create({first_name, last_name, middle_name, birth_date, military_rank, position, company_id});
    };

    const updateServiceman = (servicemanId, {first_name, last_name, middle_name, birth_date, military_rank, position, company_id}) => {
        return Serviceman.update(
            {first_name, last_name, middle_name, birth_date, military_rank, position, company_id},
            {where: {id_serviceman: servicemanId}},
        );
    }

    const deleteServiceman = (id) => {
        return Serviceman.destroy({where: {id_serviceman: id}});
    };

    return {
        getServicemanById,
        getAllServicemans,
        getAllServicemansInCompany,
        createServiceman,
        updateServiceman,
        deleteServiceman,
    };
}