import React from "react";
import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

const App = () => {
    return (
        <Box sx={{
            minHeight: "100vh"
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/registration"} element={<Registration />} />
                </Routes>
            </BrowserRouter>
        </Box>
    );
}

export default App;