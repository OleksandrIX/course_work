import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Auth from "../../api/requests/auth.request";
import { errorToastOptions } from "../../util/toast.options";
import Header from '../../components/Header';
import LoginForm from "../../components/auth/LoginForm";
import Loader from "../../components/Loader";

const styleBody = {
    display: "flex",
    flexDirection: "column",
    height: "100vh"
};

const styleFormBody = {
    flex: "1",
    margin: "50px auto"
};

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Вхід";
        Auth.checkAuth()
            .then(() => navigate("/"))
            .catch(() => { })
            .finally(() => setIsLoading(false));
    }, [navigate]);


    const handleLogin = (event) => {
        event.preventDefault();
        const loginData = { username, password };
        const loginPromises = Auth.login(loginData);

        loginPromises
            .then(() => navigate("/"))
            .catch((err) => {
                const { message } = err.response.data;
                if (err.response.status === 403) {
                    navigate("/");
                }
                if (toast.isActive("error-toast")) {
                    toast.update("error-toast", {
                        render: message,
                        ...errorToastOptions,
                    });
                } else {
                    toast.error(message, {
                        toastId: "error-toast",
                        ...errorToastOptions,
                    });
                }
            });
    };

    if (isLoading) return (<Loader />);

    return (
        <Box sx={styleBody}>
            <Header isAuth={false} />
            <Box component="main" sx={styleFormBody}>
                <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />
                <ToastContainer />
            </Box>
        </Box>
    );
};

export default Login;