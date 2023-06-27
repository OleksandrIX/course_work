import axios from "axios";
import { AuthURL } from "./api";

axios.defaults.withCredentials = true;

const checkPasswordComplexity = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`'"~!@#№$;%^:&?*()\-=+\\|/<>])[A-Za-z\d`'"~!@#№$;%^:&?*()\-=+\\|/<>]{8,}$/;
    const requirements = {
        lowercase: /(?=.*[a-z])/,
        uppercase: /(?=.*[A-Z])/,
        digit: /(?=.*\d)/,
        special: /(?=.*[`'"~!@#№$;%^:&?*()\-=+\\|/<>])/
    };

    if (password.length < 8) return { valid: false, message: "Пароль повинен містити принаймні <b>8</b> символів." };

    const missingRequirements = [];

    if (!requirements.lowercase.test(password)) {
        missingRequirements.push("<b>маленькі літери</b>");
    }
    if (!requirements.uppercase.test(password)) {
        missingRequirements.push("<b>великі літери</b>");
    }
    if (!requirements.digit.test(password)) {
        missingRequirements.push("<b>цифри</b>");
    }
    if (!requirements.special.test(password)) {
        missingRequirements.push("<b>спеціальні символи</b>");
    }

    if (missingRequirements.length > 0) {
        const errorMessage = `Пароль не відповідає вимогам складності.<br>Пароль повинен містити: ${missingRequirements.join(", ")}`;
        return { valid: false, message: errorMessage };
    }

    return { valid: passwordRegex.test(password), message: "" };
};

const checkAuth = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(AuthURL.checkAuthURL);
            resolve(true);
        } catch (err) {
            reject(false);
        }
    });
};

const Auth = {
    login: (loginData) => axios.post(AuthURL.loginURL, loginData),
    registration: (registrationData) => axios.post(AuthURL.registrationURL, registrationData),
    logout: () => axios.delete(AuthURL.logoutURL),
    checkAuth,
    checkPasswordComplexity,
};

export default Auth;