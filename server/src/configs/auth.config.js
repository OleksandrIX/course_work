const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = (passport, {findById, findByUsername}) => {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await findByUsername(username);
            if (!user) return done(null, false, {message: "Користувача з таким ім'ям не знайдено"});
            if (await bcrypt.compare(password, user.password)) return done(null, user);
            else return done(null, false, {message: "Неправильний пароль"});
        } catch (err) {
            return done(err);
        }
    };

    passport.use(new LocalStrategy({usernameField: "username"}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.idUser));
    passport.deserializeUser((id, done) => done(null, findById(id)));
};