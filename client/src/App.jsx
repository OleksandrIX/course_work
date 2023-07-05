import React from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/main/Home";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import Profile from "./pages/user/Profile";
import Medicine from "./pages/medicine/Medicine";
import Hospital from "./pages/hospital/Hospital";
import NotFound from "./pages/error/NotFound";

const App = () => {
    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Router>
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/registration"} element={<Registration />} />
                    <Route path={"/profile"} element={<Profile />} />
                    <Route path={"/medicines"} element={<Medicine />} />
                    <Route path={"/hospitals"} element={<Hospital />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </Box>
    );
}

export default App;