import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Auth from "../util/auth";
import { Box } from "@mui/material";
import Header from '../components/Header';

const styleBody = {
    display: "flex",
    flexDirection: "column",
    height: "100vh"
};

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        Auth.checkAuth().catch(() => navigate("/login"));
    }, [navigate]);

    return (
        <Box sx={styleBody}>
            <Header isAuth={true} />
            Home
        </Box>
    );
};

export default Home;