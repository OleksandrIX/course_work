import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import Auth from "../../api/requests/auth.request";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";

const styleBody = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
};

const Home = () => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Облік лікарських засобів";
        Auth.checkAuth()
            .then((data) => setIsAuth(true))
            .catch(() => navigate("/login"))
            .finally(() => setIsLoading(false));
    }, [navigate]);

    useEffect(() => {
        if (isAuth)
            Auth.checkAdmin()
                .then(({ isAdmin }) => {
                    setIsAdmin(isAdmin)
                })
                .catch(() => { });
    }, [isAuth]);

    if (isLoading) return (<Loader />);

    if (isAdmin) {
        return (
            <Box sx={styleBody}>
                <Header isAuth={isAuth} />
                <AdminPage isAuth={isAuth} />
            </Box>
        );
    } else {
        return (
            <Box sx={styleBody}>
                <Header isAuth={isAuth} />
                <UserPage isAuth={isAuth} />
            </Box>
        );
    }
};

export default Home;