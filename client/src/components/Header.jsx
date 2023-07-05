import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Box, Typography, AppBar, Toolbar, IconButton } from "@mui/material";

import HomeIcon from '@mui/icons-material/Home';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import HospitalIcon from '@mui/icons-material/LocalHospital';
import AccountBox from '@mui/icons-material/AccountBox';
import Logout from "@mui/icons-material/Logout";

import Auth from "../api/requests/auth.request";

const styleHeader = {
    padding: '10px',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#517789",
};

const Header = ({ isAuth }) => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        Auth.checkAdmin()
            .then(({ isAdmin }) => setIsAdmin(isAdmin))
            .catch(() => { });
    }, []);

    const logout = () => {
        Auth.logout()
            .then(() => navigate("/login"))
            .catch(() => { });
    };

    const redirectToHomePage = () => navigate("/");
    const redirectToProfile = () => navigate("/profile");
    const redirectToMedicine = () => navigate("/medicines");
    const redirectToHospital = () => navigate("/hospitals");

    return (
        <AppBar component="header" position="sticky">
            <Toolbar sx={styleHeader}>
                <Typography sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                }} variant="h5">
                    Облік лікарських засобів
                </Typography>

                {isAuth ?
                    <Box>
                        <Box display="flex">
                            <IconButton color="inherit" sx={{ fontSize: "20px" }} onClick={redirectToHomePage}> <HomeIcon sx={{ fontSize: "30px" }} /></IconButton>
                            {isAdmin ? "" : <IconButton color="inherit" sx={{ fontSize: "20px" }} onClick={redirectToProfile}> <AccountBox sx={{ fontSize: "30px" }} /></IconButton>}
                            {isAdmin ? <IconButton color="inherit" sx={{ fontSize: "20px" }} onClick={redirectToMedicine}> <VaccinesIcon sx={{ fontSize: "30px" }} /></IconButton> : ""}
                            {isAdmin ? <IconButton color="inherit" sx={{ fontSize: "20px" }} onClick={redirectToHospital}> <HospitalIcon sx={{ fontSize: "30px" }} /></IconButton> : ""}
                            <IconButton onClick={logout} color="inherit"><Logout sx={{ fontSize: "30px" }} /></IconButton>
                        </Box>
                    </Box>
                    : ""}
            </Toolbar>
        </AppBar>
    );
}

export default Header;