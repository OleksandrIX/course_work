const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = (passport, findByUsername, findById) => {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await findByUsername(username);
            if (!user) return done(null, false, {message: "Такого користувача немає"});

            if (await bcrypt.compare(password, user.password)) return done(null, user);
            else return done(null, false, {message: "Невірний пароль"});
        } catch (error) {
            return done(error);
        }
    };

    passport.use(new LocalStrategy({usernameField: "username"}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => done(null, findById(id)));
};