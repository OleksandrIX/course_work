const passport = require("passport");
const bcrypt = require("bcrypt");
const UserService = require("../../services/user.service");
const { apiError } = require("./error.controller");

module.exports.check = async (req, res) => {
    req.isAuthenticated() ?
        res.status(200).json({ message: "You authenticated" }) :
        apiError(res, 401, "Your not authenticated");
};

module.exports.checkAdmin = async (req, res) => {
    if (req.isAuthenticated()) {
        const user = await req.user;
        const isAdmin = user.role === "ADMIN"
        res.json({ isAdmin });
    }
    else apiError(res, 401, "Your not authenticated");
};

module.exports.login = async (req, res) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return apiError(res, 500, err.message);
        if (!user) return apiError(res, 400, info.message);
        req.logIn(user, (err) => {
            if (err) return apiError(res, 500, err.message);
            res.status(200).json({ message: "Login completed successfully" });
        });
    })(req, res);
};

module.exports.registration = async (req, res) => {
    let userData = req.body;
    try {
        const user = await UserService.findByUsername(userData.username);
        if (user) return apiError(res, 409, "Користувач з таким ім'ям вже існує");

        userData.password = await bcrypt.hash(userData.password, 10);
        await UserService.save(userData);
        res.status(200).json({ message: "Користувача створено" });
    } catch (err) {
        return apiError(res, 500, err.message);
    }
};

module.exports.logout = async (req, res) => {
    req.logout((err) => {
        if (err) return apiError(res, 500, err.message);
        res.status(200).json({ message: "Logout successful" });
    });
};