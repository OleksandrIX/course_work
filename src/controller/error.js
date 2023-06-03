module.exports.internalServerError = (req, res) => {
    res.status(500).render("pages/error", {
        status: 500,
        error: "Internal Server Error",
        message: "Помилка на стороні сервера.",
    });
};

module.exports.forbiddenError = (req, res) => {
    res.status(403).render("pages/error", {
        status: 403,
        error: "Forbidden",
        message: "У вас немає доступа до цієї сторінки",
    });
};