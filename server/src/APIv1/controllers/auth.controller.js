const passport = require("passport");
const bcrypt = require("bcrypt");
const UserService = require("../../services/user.service");

module.exports.login = async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData)

        passport.authenticate("local", (err, user, info) => {
            if (err) throw err;
            if (!user) return res.status(400).json({message: info.message});
            req.logIn(user, (err) => {
                if (err) throw err;
                res.status(200).json({message: "Login completed successfully", user});
            });
        })(req, res);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports.registration = async (req, res) => {
    try {
        const {body} = req;
        res.status(200).json({body});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};