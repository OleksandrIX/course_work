const internalServerError = (req, res) => {
    res.status(500).render('pages/error', {
        status: 500,
        error: 'Internal Server Error',
        message: 'Помилка на стороні сервера.',
    });
};

module.exports = {
    internalServerError,
};