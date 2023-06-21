module.exports = ({User, Garrison}) => {
    const findAll = () => {
        return User.findAll({where: {role: "USER"}, include: Garrison});
    };

    const findById = (id) => {
        return User.findOne({where: {id}, include: Garrison});
    };

    const findByUsername = (username) => {
        return User.findOne({where: {username}});
    };

    const isExistsById = async (id) => {
        const user = await User.findOne({where: {id}});
        return !!user;
    };

    const isExistsByUsername = async (username) => {
        const user = await User.findOne({where: {username}});
        return !!user;
    };

    const save = (userData) => {
        return User.create(userData);
    };

    const update = (id, userData) => {
        return User.update(
            userData,
            {where: {id}}
        );
    };

    const destroy = (id) => {
        return User.destroy({where: {id}});
    }

    return {
        findAll,
        findById,
        findByUsername,
        isExistsById,
        isExistsByUsername,
        save,
        update,
        destroy,
    };
};