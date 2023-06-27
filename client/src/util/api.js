const server = "http://localhost:1111/api/v1";
module.exports.AuthURL = {
    loginURL: `${server}/auth/login`,
    registrationURL: `${server}/auth/registration`,
    logoutURL: `${server}/auth/logout`,
    checkAuthURL: `${server}/auth/check`,
};