const bcrypt = require("bcrypt");
const {UserService} = require("../../services");

const getUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json({users});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const getUser = async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await UserService.getUserById(userId);
        if (!user) return res.status(404).json({message: "User not found"});
        res.status(200).json({user});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const createUser = async (req, res) => {
    let {username, password} = req.body;
    try {
        if (await UserService.isExistsByUsername(username))
            return res.status(409).json({
                message: "User with that name already exists"
            });

        password = await bcrypt.hash(password, 10);
        await UserService.createUser({username, password});
        res.status(201).json({message: "User created successfully"});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const updateUser = async (req, res) => {
    const {userId} = req.params;
    let userData = req.body;
    try {
        if (!await UserService.isExistsById(userId))
            return res.status(404).json({
                message: "User not found"
            });

        if (userData.username)
            if (await UserService.isExistsByUsername(userData.username))
                return res.status(409).json({
                    message: "User with that name already exists"
                });

        if (userData.password) userData.password = await bcrypt.hash(userData.password, 10);

        await UserService.updateUser(userId, userData);
        res.status(200).json({message: "User updated successfully"});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const deleteUser = async (req, res) => {
    const {userId} = req.params;
    try {
        if (!await UserService.isExistsById(userId))
            return res.status(404).json({
                message: "User not found"
            });

        await UserService.deleteUser(userId);
        res.status(200).json({message: "User deleted successfully"});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};