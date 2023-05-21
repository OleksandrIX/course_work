module.exports = (Weapon) => {
    const getWeaponById = (id) => {
        return Weapon.findOne({where: {id_weapon: id}});
    };

    const getWeaponByServicemanId = (serviceman_id) => {
        return Weapon.findOne({where: {serviceman_id}});
    };

    const getAllWeapons = () => {
        return Weapon.findAll({});
    };

    const createWeapon = ({name_weapon, serial_number, TTX, date_manufacture, serviceman_id}) => {
        return Weapon.create({name_weapon, serial_number, TTX, date_manufacture, serviceman_id});
    };

    const deleteWeapon = (id) => {
        return Weapon.destroy({where: {id_weapon: id}});
    };

    return {
        getWeaponById,
        getWeaponByServicemanId,
        getAllWeapons,
        createWeapon,
        deleteWeapon,
    };
}