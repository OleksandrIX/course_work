module.exports = ({Garrison, MilitaryUnit}) => {

    const findAll = () => {
        return Garrison.findAll({include: MilitaryUnit});
    };

    const findById = (id) => {
        return Garrison.findOne({where: {id}, include: MilitaryUnit});
    };

    const findAllByUserId = (userId) => {
        return Garrison.findAll({where: {userId}, include: MilitaryUnit});
    };

    const isExistsById = async (id) => {
        const garrison = await Garrison.findOne({where: {id}});
        return !!garrison;
    };

    const isExistsByName = async (nameGarrison) => {
        const garrison = await Garrison.findOne({where: {nameGarrison}});
        return !!garrison;
    };

    const save = (garrisonData) => {
        return Garrison.create(garrisonData);
    };

    const update = (id, garrisonData) => {
        return Garrison.update(
            garrisonData,
            {where: {id}}
        );
    };

    const destroy = (id) => {
        return Garrison.destroy({where: {id}});
    };


    return {
        findAll,
        findById,
        findAllByUserId,
        isExistsById,
        isExistsByName,
        save,
        update,
        destroy
    };
};