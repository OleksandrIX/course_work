module.exports = ({Unit, Personnel}) => {

    const getUnitById = (unitId) => {
        return Unit.findOne({where: {id_unit: unitId}, include: Personnel});
    };

    const getUnitAll = () => {
        return Unit.findAll({include: Personnel});
    };

    const getPersonnelOfUnit = (unitId) => {
        return Personnel.findAll({where: {unit_id: unitId}});
    };

    const createUnit = async ({name_unit}) => {
        return Unit.create({name_unit});
    };

    const updateUnit = (unitId, unitData) => {
        return Unit.update(
            unitData,
            {where: {id_unit: unitId}},
        );
    }

    const deleteUnit = (unitId) => {
        return Unit.destroy({where: {id_unit: unitId}});
    };

    const isExistsById = async (unitId) => {
        const unit = await Unit.findOne({where: {id_unit: unitId}});
        return !!unit;
    };

    const isExistsByName = async (name) => {
        const unit = await Unit.findOne({where: {name_unit: name}});
        return !!unit;
    };

    return {
        getUnitById,
        getUnitAll,
        getPersonnelOfUnit,
        createUnit,
        updateUnit,
        deleteUnit,
        isExistsById,
        isExistsByName,
    };
};