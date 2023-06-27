import React from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

import Auth from "../util/auth";

const styleHeader = {
    backgroundColor: '#1976D2',
    color: "white",
    padding: '20px',
    textAlign: 'center',
    width: "100vw",
    display: "flex",
    justifyContent: "space-between"
};

const Header = ({ isAuth }) => {
    const navigate = useNavigate();
    const logout = () => {
        const logoutPromise = Auth.logout();
        logoutPromise
            .then(() => {
                localStorage.removeItem("auth");
                navigate("/login");
            })
            .catch(err => console.log(err));
    };

    return (
        <Box
            component="header"
            sx={styleHeader}>
            <Typography sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px"
            }} variant="h5">
                <MedicalServicesIcon sx={{ fontSize: "40px" }} />
                Облік лікарських засобів військового шпиталю
            </Typography>

            {isAuth ?
                <Button sx={{
                    color: "white",
                    "&:hover": {
                        color: "black",
                    },
                }} onClick={logout}>
                    <Logout />
                </Button>
                : ""}
        </Box>
    );
}

export default Header;