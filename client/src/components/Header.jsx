import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Box, Typography, AppBar, Toolbar, IconButton, Menu, MenuItem } from "@mui/material";

import HomeIcon from '@mui/icons-material/Home';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountBox from '@mui/icons-material/AccountBox';
import Logout from "@mui/icons-material/Logout";

import Auth from "../api/requests/auth.request";

const styleHeader = {
    padding: '10px',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const Header = ({ isAuth }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        Auth.checkAdmin()
            .then(({ isAdmin }) => setIsAdmin(isAdmin))
            .catch(() => {});
    }, []);

    const logout = () => {
        Auth.logout()
            .then(() => navigate("/login"))
            .catch(() => {});
    };

    const redirectToHomePage = () => navigate("/");
    const redirectToProfile = () => navigate("/profile");
    const redirectToMedicine = () => navigate("/medicines");

    const handleMenu = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar component="header" position="sticky">
            <Toolbar sx={styleHeader}>
                <Typography sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                }} variant="h5">
                    <MedicalServicesIcon sx={{ fontSize: "50px" }} />
                    Облік лікарських засобів військового шпиталю
                </Typography>

                {isAuth ?
                    <Box>
                        <IconButton size="large"
                            aria-label="profile"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit">
                            <AccountCircle sx={{ fontSize: "40px" }} />
                        </IconButton>
                        <Menu id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem sx={{ fontSize: "20px" }} onClick={redirectToHomePage}> <HomeIcon sx={{ fontSize: "30px" }} />Головна сторінка</MenuItem>
                            {isAdmin ? "" : <MenuItem sx={{ fontSize: "20px" }} onClick={redirectToProfile}> <AccountBox sx={{ fontSize: "30px" }} />Профіль</MenuItem>}
                            {isAdmin ? <MenuItem sx={{ fontSize: "20px" }} onClick={redirectToMedicine}> <VaccinesIcon sx={{ fontSize: "30px" }} />Лікарські засоби</MenuItem> : ""}
                            <MenuItem sx={{ fontSize: "20px" }} onClick={logout}> <Logout sx={{ fontSize: "30px" }} />Вийти</MenuItem>
                        </Menu>
                    </Box>
                    : ""}
            </Toolbar>
        </AppBar>
    );
}

export default Header;