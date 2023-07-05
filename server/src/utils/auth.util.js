module.exports.checkAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Your not authenticated" });
    next();
};

module.exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return res.status(403).json({ message: "You authenticated" });
    next();
};

module.exports.checkAdmin = async (req, res, next) => {
    const user = await req.user;
    if (user.role !== "ADMIN") return res.status(403).json({message: "You do not have access to the resource"});
    next();
};