module.exports = (WeaponMaintenance) => {
    const getMaintenanceById = (id)=>{
        return WeaponMaintenance.findOne({where: {id_maintenance: id}});
    };

    const getMaintenancesByWeaponId = (weaponId) => {
      return WeaponMaintenance.findAll({where: {weapon_id: weaponId}});
    };

    const getAllMaintenances = ()=>{
        return WeaponMaintenance.findAll({});
    };

    return {
        getMaintenanceById,
        getMaintenancesByWeaponId,
        getAllMaintenances,
    };
};