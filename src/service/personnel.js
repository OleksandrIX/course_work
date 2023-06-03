module.exports = ({Personnel, PersonalData}) => {

    const getPersonnelById = (personnelId) => {
        return Personnel.findByPk(personnelId, {include: PersonalData});
    };

    const getAllPersonnel = () => {
        return Personnel.findAll();
    };

    const getPersonalData = (personalDataId) => {
        return PersonalData.findByPk(personalDataId);
    };

    const savePersonnel = (personnelData) => {
        return Personnel.create(personnelData);
    };

    const updatePersonnel = (personnelId, personnelData) => {
        return Personnel.update(
            personnelData,
            {where: {id: personnelId}},
        );
    };

    const updatePersonalData = (personalDataId, personalData) => {
        return PersonalData.update(
            personalData,
            {where: {id: personalDataId}},
        );
    };

    const deletePersonnel = (personnelId) => {
        return Personnel.destroy({where: {id: personnelId}});
    };

    const isExistsById = async (personnelId) => {
        const personnel = await Personnel.findOne({where: {id: personnelId}});
        return !!personnel;
    };

    return {
        getPersonnelById,
        getAllPersonnel,
        getPersonalData,
        savePersonnel,
        updatePersonnel,
        updatePersonalData,
        deletePersonnel,
        isExistsById,
    };
};