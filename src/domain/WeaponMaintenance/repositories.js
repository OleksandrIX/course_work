module.exports = (WeaponMaintenance) => {
    const getMaintenanceById = (id) => {
        return WeaponMaintenance.findOne({where: {id_maintenance: id}});
    };

    const getMaintenancesByWeaponId = (weaponId) => {
        return WeaponMaintenance.findAll({where: {weapon_id: weaponId}});
    };

    const getAllMaintenances = () => {
        return WeaponMaintenance.findAll({});
    };

    const createMaintenance = ({type_maintenance, date_maintenance, weapon_id}) => {
        return WeaponMaintenance.create({type_maintenance, date_maintenance, weapon_id});
    };

    const updateMaintenance = (maintenanceId, {type_maintenance, date_maintenance, weapon_id}) => {
        return WeaponMaintenance.update(
            {type_maintenance, date_maintenance, weapon_id},
            {where: {id_maintenance: maintenanceId}},
        );
    };

    const deleteMaintenance = (id) => {
        return WeaponMaintenance.destroy({where: {id_maintenance: id}});
    };


    return {
        getMaintenanceById,
        getMaintenancesByWeaponId,
        getAllMaintenances,
        createMaintenance,
        updateMaintenance,
        deleteMaintenance,
    };
};