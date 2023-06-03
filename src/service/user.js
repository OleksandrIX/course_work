module.exports = ({User, Unit}) => {
    const getUserById = (userId) => {
        return User.findByPk(userId, {include: Unit});
    };

    const getUserByUsername = (username) => {
        return User.findOne({where: {username}});
    };

    const getAllUsers = () => {
        return User.findAll({where: {role: "USER"}, include: Unit});
    };

    const saveUser = (userData) => {
        return User.create(userData);
    };

    const updateUser = (userId, userData) => {
        return User.update(
            userData,
            {where: {id: userId}},
        );
    }

    const deleteUser = (userId) => {
        return User.destroy({where: {id: userId}});
    };

    const isExistsById = async (userId) => {
        const user = await User.findOne({where: {id: userId}});
        return !!user;
    };

    const isExistsByUsername = async (username) => {
        const user = await User.findOne({where: {username}});
        return !!user;
    };

    return {
        getUserById,
        getUserByUsername,
        getAllUsers,
        saveUser,
        updateUser,
        deleteUser,
        isExistsById,
        isExistsByUsername,
    };
};