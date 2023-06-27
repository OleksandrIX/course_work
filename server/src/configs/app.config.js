const clientHost = `${process.env.CLIENT_PROTOCOL}://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`;

module.exports = {
    port: process.env.PORT,
    client: clientHost,
};