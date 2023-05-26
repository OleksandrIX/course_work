const router = require("express").Router();

router.use((req, res) => {
    res.status(404).render('pages/error', {
        status: 404,
        error: 'Not Found',
        message: 'Запитуваний ресурс не вдалося знайти.',
    });
});

module.exports = router;