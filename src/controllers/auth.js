const passport = require("passport");
const bcrypt = require("bcrypt");
const {internalServerError} = require("./error");
const {UserService} = require("../services");

const login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            req.session.errorMessage = info.message;
            return res.redirect("/auth/login");
        }

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect('/');
        });
    })(req, res, next);
};

const registration = async (req, res) => {
    let {username, password} = req.body;
    try {
        if (await UserService.isExistsByUsername(username)) {
            req.session.errorMessage = "Користувач с таким ім'ям вже існує";
            return res.redirect("/auth/registration");
        }

        password = await bcrypt.hash(password, 10);
        await UserService.createUser({username, password});
        res.redirect("/auth/login");
    } catch (err) {
        console.log("Error: ", err.message);
        internalServerError(req, res);
    }
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: 'Internal Server Error' });
        res.status(200).json({ redirectUrl: "/auth/login" });
    });
};

module.exports = {
    login,
    registration,
    logout,
}