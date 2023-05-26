module.exports = ({Personnel, Salary}) => {

    const getPersonnelById = (personnelId) => {
        return Personnel.findOne({where: {id_personnel: personnelId}, include: Salary});
    };

    const getAllPersonnel = () => {
        return Personnel.findAll();
    };

    const createPersonnel = (personnelData) => {
        return Personnel.create(personnelData);
    };

    const updatePersonnel = (personnelId, personnelData) => {
        return Personnel.update(
            personnelData,
            {where: {id_personnel: personnelId}},
        );
    };

    const deletePersonnel = (personnelId)=>{
        return Personnel.destroy({where: {id_personnel: personnelId}});
    };

    const isExistsById = async (personnelId) => {
        const personnel = await Personnel.findOne({where: {id_personnel: personnelId}});
        return !!personnel;
    };

    return {
        getPersonnelById,
        getAllPersonnel,
        createPersonnel,
        updatePersonnel,
        deletePersonnel,
        isExistsById,
    };
};