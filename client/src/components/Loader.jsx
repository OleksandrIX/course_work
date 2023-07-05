import React from "react";
import { CircularProgress, Box } from "@mui/material";

const styleLoader = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
};

const Loader = () => {
    return (
        <Box sx={styleLoader}>
            <CircularProgress />
        </Box>
    );
}

export default Loader;