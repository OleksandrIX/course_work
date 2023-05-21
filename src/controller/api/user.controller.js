const bcrypt = require("bcrypt");
const {UserRepo, CompanyRepo} = require("../../domain");
const getUsers = async (req, res) => {
    try {
        const users = await UserRepo.getAllUsers();
        res.json({users, status: 200})
    } catch (err) {
        console.log("Error: ", err);
        res.json({message: err.message, status: 500});
    }
};

const getUser = async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await UserRepo.getUserById(userId);
        if (!user) res.json({message: "User not found", status: 404});
        else res.json({user, status: 200});
    } catch (err) {
        console.log("Error: ", err);
        res.json({message: err.message, status: 500});
    }
};

const getAllCompaniesInUser = async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await UserRepo.getUserById(userId);
        if (!user) return res.json({
            message: "User not found",
            status: 404,
        });

        const companies = await CompanyRepo.getAllCompaniesFromUser(userId);
        if(companies.length === 0) return res.json({
            message: "There are no companies in this user",
            status: 404,
        });

        res.json({companies, status: 200});
    } catch (err) {
        console.log("Error: ", err);
        res.json({message: err.message, status: 500});
    }
};

const addUser = async (req, res) => {
    const userData = req.body;
    userData.username = userData.username.trim();
    userData.password = await bcrypt.hash(userData.password.trim(), 10);
    try {
        await UserRepo.createUser(userData);
        res.json({status: 200});
    } catch (err) {
        console.log("Error: ", err);
        res.json({message: err.message, status: 500});
    }
};

const editUser = async (req, res) => {
    const {userId} = req.params;
    const {username} = req.body;
    try {
        await UserRepo.updateUser(userId, username);
        res.json({status: 200});
    } catch (err) {
        console.log("Error: ", err);
        res.json({message: err.message, status: 500});
    }
};

const deleteUser = async (req, res) => {
    const {userId} = req.params;
    try {
        await UserRepo.deleteUser(userId);
        res.json({status: 200});
    } catch (err) {
        console.log("Error: ", err);
        res.json({message: err.message, status: 500});
    }
};

module.exports = {
    getUsers,
    getUser,
    getAllCompaniesInUser,
    addUser,
    editUser,
    deleteUser,
};