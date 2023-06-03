const bcrypt = require("bcrypt");
const {UserService, isExistsByLicenseNumber} = require("../../service");

module.exports.getUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json({users});
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({error: err.message});
    }
};

module.exports.getUser = async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await UserService.getUserById(userId);
        if (!user) return res.status(404).json({message: "User not found"});
        res.status(200).json({user});
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({error: err.message});
    }
};

module.exports.createUser = async (req, res) => {
    const userData = req.body;
    try {
        if (await UserService.isExistsByUsername(userData.username))
            return res.status(409).json({
                message: "Користувач з таким ім'ям вже існує"
            });

        if (await isExistsByLicenseNumber(userData.licenseNumber))
            return res.status(409).json({
                message: "Такий номер посвідчення вже існує"
            });

        userData.password = await bcrypt.hash(userData.password, 10);
        const user = await UserService.saveUser(userData);
        res.status(201).json({message: "User created successfully", user});
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({error: err.message});
    }
};

module.exports.editUser = async (req, res) => {
    const {userId} = req.params;
    const userData = req.body;
    try {
        const user = await UserService.getUserById(userId);

        if (!await UserService.isExistsById(userId))
            return res.status(404).json({
                message: "User not found"
            });
        if (userData.username && user.username !== userData.username &&
            await UserService.isExistsByUsername(userData.username))
            return res.status(409).json({
                message: "Користувач з таким ім'ям вже існує"
            });

        if (userData.licenseNumber && user.licenseNumber !== userData.licenseNumber &&
            await isExistsByLicenseNumber(userData.licenseNumber))
            return res.status(409).json({
                message: "Такий номер посвідчення вже існує"
            });
        if (userData.password) userData.password = await bcrypt.hash(userData.password, 10);

        await UserService.updateUser(userId, userData);
        res.status(200).json({message: "User updated successfully"});
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({error: err.message});
    }
};

module.exports.deleteUser = async (req, res) => {
    const {userId} = req.params;
    try {
        if (!await UserService.isExistsById(userId))
            return res.status(404).json({
                message: "User not found"
            });

        await UserService.deleteUser(userId);
        res.status(200).json({message: "User deleted successfully"});
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({error: err.message});
    }
};