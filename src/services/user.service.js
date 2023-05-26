module.exports = ({User}) => {
    const getUserById = (userId) => {
        return User.findOne({where: {id_user: userId}});
    };

    const getUserByUsername = (username) => {
        return User.findOne({where: {username}});
    };

    const getAllUsers = () => {
        return User.findAll({where: {role: "USER"}});
    };

    const createUser = ({username, password}) => {
        return User.create({username, password});
    };

    const updateUser = (userId, userData) => {
        return User.update(
            userData,
            {where: {id_user: userId}},
        );
    }

    const deleteUser = (userId) => {
        return User.destroy({where: {id_user: userId}});
    };

    const isExistsById = async (userId) => {
        const user = await User.findOne({where: {id_user: userId}});
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
        createUser,
        updateUser,
        deleteUser,
        isExistsById,
        isExistsByUsername,
    };
};