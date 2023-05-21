const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = (passport, getUserByUsername, getUserById) => {
    const authenticateUser = async (username, password, done) => {
        const user = await getUserByUsername(username);

        if (!user) {
            return done(null, false, {message: "Такого користувача немає."});
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, {message: "Невірний пароль."});
            }
        } catch (error) {
            return done(error);
        }
    };

    passport.use(new LocalStrategy({usernameField: "username"}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id_user));
    passport.deserializeUser(async (id, done) => done(null, getUserById(id)));
};