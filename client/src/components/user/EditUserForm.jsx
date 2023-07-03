import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToastOptions } from "../../util/toast.options";

import User from "../../api/requests/user.request";

const styleForm = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px 10px",
    borderRadius: "10px",
};

const EditUserFrom = ({ user, onDone }) => {
    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [position, setPosition] = useState(user.position);

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = { username, firstName, lastName, position };

        User.editUser(user.idUser, userData)
            .then(() => {
                toast.dismiss("error-toast");
                if (toast.isActive("success-toast")) {
                    toast.update("success-toast", {
                        render: "Дані збрежено",
                        ...errorToastOptions,
                    });
                } else {
                    toast.success("Дані збрежено", {
                        toastId: "success-toast",
                        ...errorToastOptions,
                    });
                }
                onDone(userData);
            })
            .catch((err) => {
                const { message } = err.response.data;
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
        <Box sx={styleForm} component="form" onSubmit={handleSubmit}>
            <Typography sx={{ margin: "auto", fontSize: "30px", fontWeight: "bold" }} component="h5">Редагувати користувача</Typography>

            <TextField type="text"
                label="Username"
                variant="outlined"
                required autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)} />

            <Box sx={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
                <TextField type="text"
                    label="Ім'я"
                    variant="outlined"
                    required={true}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />

                <TextField type="text"
                    label="Прізвище"
                    variant="outlined"
                    required={true}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} />
            </Box>

            <TextField type="text"
                label="Посада"
                variant="outlined"
                required={true}
                value={position}
                onChange={(e) => setPosition(e.target.value)} />

            <Button sx={{ fontWeight: "bold", fontSize: "24px" }}
                variant="contained"
                color="primary"
                type="submit">
                Редагувати
            </Button>
        </Box>
    );
};

export default EditUserFrom;