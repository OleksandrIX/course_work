import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import Auth from "../api/requests/auth.request";
import Header from '../components/Header';
import Loader from '../components/Loader';

const styleBody = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
};

const Home = () => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Облік лікарських засобів";
        Auth.checkAuth()
            .then(() => setIsAuth(true))
            .catch(() => navigate("/login"))
            .finally(() => setIsLoading(false));
    }, [navigate]);

    if (isLoading) return (<Loader />);

    return (
        <Box sx={styleBody}>
            <Header isAuth={isAuth} />
            <Box sx={{ margin: "10px", textAlign: "justify" }}>
                
            </Box>
        </Box>
    );
};

export default Home;