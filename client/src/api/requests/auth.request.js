import Axios from "axios";
import { AuthURL } from "../url";

Axios.defaults.withCredentials = true;

const Auth = {
    login: (loginData) => Axios.post(AuthURL.loginURL, loginData),
    registration: (registrationData) => Axios.post(AuthURL.registrationURL, registrationData),
    logout: () => Axios.delete(AuthURL.logoutURL),
    checkAuth: () => new Promise((resolve, reject) => Axios.get(AuthURL.checkAuthURL).then(() => resolve(true)).catch(() => reject(false))),
    checkAdmin: () => new Promise((resolve, reject) => Axios.get(AuthURL.checkAdminURL).then(({data}) => resolve(data)).catch((err) => reject(err))),
};

export default Auth;