module.exports = ({Unit, Personnel, User}) => {

    const getUnitById = (unitId) => {
        return Unit.findByPk(unitId, {include: [Personnel]});
    };

    const getAllUnits = () => {
        return Unit.findAll({include: User});
    };

    const saveUnit = (unitData) => {
        return Unit.create(unitData);
    };

    const updateUnit = (unitId, unitData) => {
        return Unit.update(
            unitData,
            {where: {id: unitId}},
        );
    };

    const deleteUnit = (unitId) => {
        return Unit.destroy({where: {id: unitId}});
    };

    const isExistsById = async (unitId) => {
        const unit = await Unit.findOne({where: {id: unitId}});
        return !!unit;
    };

    return {
        getUnitById,
        getAllUnits,
        saveUnit,
        updateUnit,
        deleteUnit,
        isExistsById,
    };
};