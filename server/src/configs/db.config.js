module.exports = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    options: {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
    },
};