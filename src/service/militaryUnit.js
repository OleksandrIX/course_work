module.exports = ({MilitaryUnit, LocationServiceman}) => {

    const findAll = () => {
        return MilitaryUnit.findAll();
    };

    const findById = (id) => {
        return MilitaryUnit.findOne({where: {id}, include: LocationServiceman});
    };

    const findAllByGarrisonId = (garrisonId) => {
        return MilitaryUnit.findAll({where: {garrisonId}, include: LocationServiceman});
    };

    const isExistsById = async (id) => {
        const militaryUnit = await MilitaryUnit.findOne({where: {id}});
        return !!militaryUnit;
    };

    const isExistsByName = async (nameMilitaryUnit) => {
        const militaryUnit = await MilitaryUnit.findOne({where: {nameMilitaryUnit}});
        return !!militaryUnit;
    };

    const save = (militaryUnitData) => {
        return MilitaryUnit.create(militaryUnitData);
    };

    const update = (id, militaryUnitData) => {
        return MilitaryUnit.update(
            militaryUnitData,
            {where: {id}}
        );
    };

    const destroy = (id) => {
        return MilitaryUnit.destroy({where: {id}});
    };

    return {
        findAll,
        findById,
        findAllByGarrisonId,
        isExistsById,
        isExistsByName,
        save,
        update,
        destroy,
    };
};