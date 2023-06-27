import axios from "axios";

export default {
    login: (url, loginData) => axios.post(url, loginData),
};