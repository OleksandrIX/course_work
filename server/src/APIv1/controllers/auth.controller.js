const passport = require("passport");
const bcrypt = require("bcrypt");
const UserService = require("../../services/user.service");
const { apiError } = require("./error.controller");

module.exports.check = (req, res) => {
    req.isAuthenticated() ?
        res.status(200).json({ message: "You authenticated" }) :
        apiError(res, 401, "Your not authenticated");
};

module.exports.login = async (req, res) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return apiError(res, 500, err.message);
        if (!user) return apiError(res, 400, info.message);
        req.logIn(user, (err) => {
            if (err) return apiError(res, 500, err.message);
            res.status(200).json({ message: "Login completed successfully", user });
        });
    })(req, res);
};

module.exports.registration = async (req, res) => {
    let { username, password } = req.body;
    try {
        const user = await UserService.findByUsername(username);
        if (user) return apiError(res, 409, "Користувач з таким ім'ям вже існує");

        password = await bcrypt.hash(password, 10);
        await UserService.save({ username, password });
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