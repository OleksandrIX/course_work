const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/home");
    }
    next();
};

const checkAdmin = async (req, res, next) => {
    const user = await req.user;
    if (user.role !== "ADMIN") {
        return res.redirect(403, "/home");
    }
    next();
};

const isAdmin = async (req, res, next) => {
    const user = await req.user;
    if (user.role === "ADMIN") {
        return res.redirect("/admin");
    }
    next();
};

module.exports = {
    checkNotAuthenticated,
    checkAuthenticated,
    checkAdmin,
    isAdmin,
};