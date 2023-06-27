import React, {useEffect, useState} from "react";

import {AppBar, Box, Toolbar, Button, TextField, Typography, Link} from "@mui/material";
import {loginURL, host} from "../util/api";
import Auth from "../util/auth";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {errorToastOptions} from "../util/toast.options";
import axios from "axios";

const styleBody = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
};

const styleForm = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "500px",
    padding: "20px 10px",
    borderRadius: "10px",
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        const loginData = {username, password};
        const loginPromises = Auth.login(loginURL, loginData);

        loginPromises
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                const {message} = err.response.data;

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

    useEffect(() => {
        document.title = "Вхід";
    }, [username]);


    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography variant="h5"> Облік лікарських засобів військового шпиталю</Typography>
                </Toolbar>
            </AppBar>
            <Box sx={styleBody}>
                <Box sx={styleForm} component="form" onSubmit={handleLogin}>
                    <Toolbar sx={{margin: "auto", fontSize: "40px"}} component="h1">
                        Вхід
                    </Toolbar>
                    <TextField name="username"
                               type="text"
                               label="Username"
                               variant="outlined"
                               required={true}
                               autoFocus={true}
                               onChange={(e) => setUsername(e.target.value)}/>
                    <TextField name="password"
                               type="password"
                               label="Password"
                               variant="outlined"
                               required={true}
                               onChange={(e) => setPassword(e.target.value)}/>
                    <Button sx={{fontWeight: "bold", fontSize: "24px"}}
                            variant="contained"
                            color="primary"
                            type="submit">
                        Увійти
                    </Button>
                    <Link sx={{fontSize: "20px"}} href="/registration">
                        Зареєструватися
                    </Link>
                </Box>
            </Box>
            <ToastContainer limit={3}/>
        </div>
    );
};

export default Login;