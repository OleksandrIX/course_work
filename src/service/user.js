module.exports = ({User}) => {
    const getUserById = (idUser) => {
        return User.findOne({where: {idUser}});
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

    const updateUser = (idUser, userData) => {
        return User.update(
            userData,
            {where: {idUser}},
        );
    }

    const deleteUser = (idUser) => {
        return User.destroy({where: {idUser}});
    };

    const isExistsById = async (idUser) => {
        const user = await User.findOne({where: {idUser}});
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