module.exports.checkAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) return res.status(401).json({message: "Your not authenticated"});
    next();
};

module.exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return res.status(403).json({message: "You authenticated"});
    next();
};