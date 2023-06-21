module.exports = ({Serviceman, LocationServiceman}) => {
    const findById = (id) => {
        return Serviceman.findOne({where: {id}, include: LocationServiceman});
    };

    const findAll = () => {
        return Serviceman.findAll();
    };

    const isExistsById = async (id) => {
        const serviceman = await Serviceman.findOne({where: {id}});
        return !!serviceman;
    };

    const save = async (servicemanData) => {
        const serviceman = await Serviceman.create(servicemanData);
        const locationServiceman = {
            servicemanId: serviceman.id,
            currentMilitaryUnitId: servicemanData.currentMilitaryUnitId,
            permanentMilitaryUnitId: servicemanData.permanentMilitaryUnitId,
        };
        await LocationServiceman.create(locationServiceman);
        return serviceman;
    };

    const update = async (id, servicemanData) => {
        await LocationServiceman.update({
            currentMilitaryUnitId: servicemanData.currentMilitaryUnitId,
            permanentMilitaryUnitId: servicemanData.permanentMilitaryUnitId
        }, {where: {servicemanId: id}});

        return Serviceman.update(servicemanData, {where: {id}});
    };

    const destroy = (id) => {
        return Serviceman.destroy({where: {id}});
    };

    return {
        findAll,
        findById,
        isExistsById,
        save,
        update,
        destroy,
    };
};