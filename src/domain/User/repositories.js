module.exports = (User) => {
    const getUserById = (id) => {
        return User.findOne({where: {id_user: id}});
    };

    const getUserByUsername = (username) => {
        return User.findOne({where: {username}});
    };

    const getAllUsers = () => {
        return User.findAll({});
    };

    const createUser = ({username, password, role = "USER"}) => {
        return User.create({username, password, role});
    };

    const updateUser = (id, username) => {
        return User.update(
            {username},
            {where: {id_user: id}},
        );
    }

    const deleteUser = (id) => {
        return User.destroy({where: {id_user: id}});
    };


    return {
        getUserById,
        getUserByUsername,
        getAllUsers,
        createUser,
        updateUser,
        deleteUser,
    };
}