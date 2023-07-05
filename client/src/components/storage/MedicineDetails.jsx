import React from "react";
import { Box, Typography } from "@mui/material";

const MedicineDetails = ({ medicine }) => {
    return (
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            padding: "0 20px",
            borderRadius: "12px"
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "20px 10px",
            }}>
                <Typography><i>Назва лікарського засобу:</i> <b>{medicine.medicineName}</b></Typography>
                <Typography><i>В чому вимірюється:</i> {medicine.unitName}</Typography>
                <Typography><i>Термін придатності:</i> {medicine.expirationDate}</Typography>
                <Typography><i>Показання:</i> {medicine.indications}</Typography>
                <Typography><i>Протипоказання:</i> {medicine.contraindications}</Typography>
                <Typography><i>Опис:</i> {medicine.description}</Typography>
                <Typography><i>Інструкція використання:</i> {medicine.instruction}</Typography>
            </Box>
        </Box>
    );
};

export default MedicineDetails;