module.exports.apiError = (res, status, message) => {
    res.status(status).json({ message });
};