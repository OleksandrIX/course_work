import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../components/Header';
import Auth from "../util/auth";
import { errorToastOptions } from "../util/toast.options";
import RegistrationForm from '../components/auth/RegistrationForm';

const styleBody = {
    display: "flex",
    flexDirection: "column",
    height: "100vh"
};

const styleFormBody = {
    flex: "1",
    margin: "50px auto"
};

const Registration = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        document.title = "Реєстрація";
        Auth.checkAuth().then(() => navigate("/")).catch(() => console.log());
    }, [navigate]);


    const handleRegistration = (event) => {
        event.preventDefault();

        const passwordComplexity = Auth.checkPasswordComplexity(password);

        if (!passwordComplexity.valid) {
            if (toast.isActive("error-toast")) {
                toast.update("error-toast", {
                    render: <div dangerouslySetInnerHTML={{ __html: passwordComplexity.message }} />,
                    ...errorToastOptions,
                });
            } else {
                toast.error(<div dangerouslySetInnerHTML={{ __html: passwordComplexity.message }} />, {
                    toastId: "error-toast",
                    ...errorToastOptions,
                });
            }
            return;
        }

        const registrationData = { username, password };
        const registrationPromises = Auth.registration(registrationData);

        registrationPromises
            .then(({ data }) => {
                navigate("/login");
            })
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

    return (
        <Box sx={styleBody}>
            <Header isAuth={false} />
            <Box component="main" sx={styleFormBody}>
                <RegistrationForm handleRegistration={handleRegistration} setUsername={setUsername} setPassword={setPassword} />
                <ToastContainer />
            </Box>
        </Box>
    );
};

export default Registration;