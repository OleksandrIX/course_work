const bcrypt = require("bcrypt");
const {UserService} = require("../../service");
const {apiError} = require("../error");

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserService.findAll();
        res.status(200).json({users});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};

module.exports.getOneUserById = async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await UserService.findById(userId);
            if (!user) return apiError(res, 404, "User with this ID was not found");
        res.status(200).json({user});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};

module.exports.createUser = async (req, res) => {
    const userData = req.body;
    try {
        if (await UserService.isExistsByUsername(userData.username))
            return apiError(res, 409, "Користувач з таким ім'ям вже існує");

        userData.password = await bcrypt.hash(userData.password, 10);
        const user = await UserService.save(userData);
        res.status(201).json({user});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};

module.exports.updateUser = async (req, res) => {
    const {userId} = req.params;
    const userData = req.body;
    try {
        let user = await UserService.findById(userId);

            if (!user) return apiError(res, 404, "User with this ID was not found");

        if (userData.username && user.username !== userData.username &&
            await UserService.isExistsByUsername(userData.username))
            return apiError(res, 409, "Користувач з таким ім'ям вже існує");

        if (userData.password) userData.password = await bcrypt.hash(userData.password, 10);
        user = await UserService.update(userId, userData);
        res.status(200).json({user});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};

module.exports.deleteUser = async (req, res) => {
    const {userId} = req.params;
    try {
        if (!await UserService.isExistsById(userId))
            return apiError(res, 404, "User with this ID was not found");

        await UserService.destroy(userId);
        res.status(200).json({message: "User deleted successfully"});
    } catch (err) {
        console.log(err.message);
        apiError(res, 500, err.message);
    }
};