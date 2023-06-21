module.exports.internalServerError = (res) => {
    res.status(500).render("pages/error", {
        status: 500,
        error: "Internal Server Error",
        message: "Помилка на стороні сервера.",
    });
};

module.exports.notFoundError = (res, message) => {
    res.status(404).render("pages/error", {
        status: 404,
        error: "Not Found",
        message: message,
    });
};

module.exports.apiError = (res, status, message) => {
    res.status(status).json({message});
};