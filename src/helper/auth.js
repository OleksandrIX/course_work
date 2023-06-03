const checkAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect("/login");
    next();
};

const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return res.redirect("/");
    next();
};

const checkAdmin = async (req, res, next) => {
    const user = await req.user;
    if (user.role !== "ADMIN") return res.status(403).redirect("/");
    next();
};

module.exports = {
    checkNotAuthenticated,
    checkAuthenticated,
    checkAdmin,
};