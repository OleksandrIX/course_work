import Axios from "axios";
import { UserURL } from "../url";

Axios.defaults.withCredentials = true;

const User = {
    getCurrentUser: () => Axios.get(UserURL.getCurrentUser),
    changePassword: (idUser, password) => Axios.put(UserURL.changePassword + idUser, password),
    editUser: (idUser, userData) => Axios.put(UserURL.editUser + idUser, userData),
    deleteUser: (idUser) => Axios.delete(UserURL.deleteUser + idUser),
};

export default User;