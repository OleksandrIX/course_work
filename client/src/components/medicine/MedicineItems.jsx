import React, { useState } from "react";
import { Box } from "@mui/material";
import MedicineItem from "./MedicineItem";

const MedicineItems = ({ medicines, editMedicine, deleteMedicine }) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

    return (
        <Box sx={{
            margin: "50px 0 30px 400px",
        }}>
            {medicines.map((medicine, index) => (
                <MedicineItem
                    key={index}
                    medicine={medicine}
                    expanded={expanded}
                    changeExpanded={handleChange}
                    editMedicine={editMedicine}
                    deleteMedicine={deleteMedicine}
                />
            ))}
        </Box>
    );
};

export default MedicineItems;