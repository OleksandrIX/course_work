import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToastOptions } from "../../util/toast.options";

import Address from "../../api/requests/address.request";

const styleForm = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px 10px",
    borderRadius: "10px",
};

const EditAddress = ({ idUser, address, onDone }) => {
    const [city, setCity] = useState(address.city);
    const [street, setStreet] = useState(address.street);
    const [numberStreet, setNumberStreet] = useState(address.numberStreet);

    const handleSubmit = (event) => {
        event.preventDefault();
        const addressData = { city, street, numberStreet, idUser };
        const { idAddress } = address;
        if (idAddress) {
            Address.editAddress(idAddress, addressData)
                .then(() => {
                    toast.dismiss("error-toast");
                    if (toast.isActive("success-toast")) {
                        toast.update("success-toast", {
                            render: "Адресу збрежено",
                            ...errorToastOptions,
                        });
                    } else {
                        toast.success("Адресу збрежено", {
                            toastId: "success-toast",
                            ...errorToastOptions,
                        });
                    }
                    onDone(addressData);
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
        } else {
            Address.createAddress(addressData)
                .then(() => {
                    toast.dismiss("error-toast");
                    if (toast.isActive("success-toast")) {
                        toast.update("success-toast", {
                            render: "Адресу збрежено",
                            ...errorToastOptions,
                        });
                    } else {
                        toast.success("Адресу збрежено", {
                            toastId: "success-toast",
                            ...errorToastOptions,
                        });
                    }
                    onDone(addressData);
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
        }
    };

    return (
        <Box sx={styleForm} component="form" onSubmit={handleSubmit}>
            <Typography sx={{ margin: "auto", fontSize: "30px", fontWeight: "bold" }} component="h5">Редагувати адресу</Typography>

            <TextField autoFocus required label="Місто" value={city} onChange={(e) => setCity(e.target.value)} />

            <Box sx={{ display: "flex", justifyContent: "space-between", gap: "20px" }} >
                <TextField required label="Вулиця" value={street} onChange={(e) => setStreet(e.target.value)} />
                <TextField required label="Номер вулиці" value={numberStreet} onChange={(e) => setNumberStreet(e.target.value)} />
            </Box>

            <Button sx={{ fontWeight: "bold", fontSize: "24px" }}
                variant="contained"
                color="primary"
                type="submit">
                Редагувати
            </Button>
        </Box>
    );
};

export default EditAddress;