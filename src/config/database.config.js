module.exports = {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    options: {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
    },
};