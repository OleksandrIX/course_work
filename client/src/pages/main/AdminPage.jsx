import React, { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

import HospitalRequest from "../../api/requests/hospital.request";
import StorageData from "../../components/storage/StorageData";

import { ToastContainer } from "react-toastify";

const AdminHomePage = () => {
    const [selectedHospital, setSelectedHospital] = useState("");
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        HospitalRequest.getAllHospitals()
            .then(({ data }) => setHospitals(data.hospitals))
            .catch(err => console.log(err));
    }, []);

    return (
        <Box display="flex" height="90%">
            <Box m={4}>
                <Typography variant="h5" gutterBottom>Виберіть військовий шпиталь</Typography>
                <FormControl sx={{ minWidth: "150px" }}>
                    <InputLabel id="hospital-select-label">Шпиталь</InputLabel>
                    <Select
                        labelId="select-label"
                        id="hospital-select"
                        value={selectedHospital}
                        onChange={(e) => setSelectedHospital(e.target.value)}
                        autoWidth
                        label="Шпиталь"
                    >
                        {hospitals.map((hospital, index) => (
                            <MenuItem
                                key={index}
                                value={hospital.idHospital}
                            >
                                {hospital.nameHospital}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" flex="1">
                {selectedHospital ? (<StorageData hospital={hospitals.find((hospital) => hospital.idHospital === selectedHospital)} />) : ""}
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default AdminHomePage;