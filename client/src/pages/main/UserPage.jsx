import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import StorageData from "../../components/storage/StorageData";
import User from "../../api/requests/user.request";
import { ToastContainer } from "react-toastify";

const UserHomePage = () => {
    const [hospital, setHospital] = useState(null);

    useEffect(() => {
        User.getCurrentUser()
            .then(({ data }) => {
                setHospital(data.user.hospital);
            })
            .catch((err) => console.log(err))
    }, []);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" flex="1">
            <StorageData hospital={hospital} />
            <ToastContainer />
        </Box>
    );
};

export default UserHomePage;