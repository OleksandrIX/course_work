import React, { useState } from "react";
import { Box, TextField, InputAdornment, IconButton, Button, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToastOptions } from "../../util/toast.options";

import User from "../../api/requests/user.request";
import { checkPasswordComplexity } from "../../util/auth";

const styleForm = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px 10px",
    borderRadius: "10px",
};

const ChangePasswordForm = ({ idUser, onDone }) => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(prev => !prev);
    const handleClickShowRepeatPassword = () => setShowRepeatPassword(prev => !prev);

    const changePassword = (event) => {
        event.preventDefault();
        const passwordComplexity = checkPasswordComplexity(password);
        const isEquels = password === repeatPassword;
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
        } else if (!isEquels) {
            if (toast.isActive("error-toast")) {
                toast.update("error-toast", {
                    render: "Паролі не співпадають",
                    ...errorToastOptions,
                });
            } else {
                toast.error("Паролі не співпадають", {
                    toastId: "error-toast",
                    ...errorToastOptions,
                });
            }
            return;
        } else if (toast.isActive("error-toast")) toast.dismiss("error-toast");

        const promise = User.changePassword(idUser, { password });

        promise.then(() => onDone()).catch();
        toast.promise(promise, {
            pending: {
                render: "Збережання даних...",
                delay: undefined,
            },
            success: "Пароль збережено",
            error: "Помилка при збереженні пароля",
        }, { ...errorToastOptions });
    };

    return (
        <Box sx={styleForm} component="form" onSubmit={changePassword}>
            <Typography sx={{ margin: "auto", fontSize: "30px", fontWeight: "bold" }} component="h5">Змінити пароль</Typography>

            <TextField
                name="password" type={showPassword ? "text" : "password"}
                label="Пароль"
                variant="outlined"
                required autoFocus
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{

                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword} edge="end">
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                }} />

            <TextField name="repeat-password" type={showRepeatPassword ? "text" : "password"}
                label="Повторіть пароль"
                variant="outlined"
                required={true}
                onChange={(e) => setRepeatPassword(e.target.value)}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowRepeatPassword} edge="end">
                                {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                }} />

            <Button sx={{ fontWeight: "bold", fontSize: "24px" }}
                variant="contained"
                color="primary"
                type="submit">
                Змінити
            </Button>
        </Box>
    );
};

export default ChangePasswordForm;