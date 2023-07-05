import React from "react";
import { Button, ButtonGroup, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MedicineItem = ({ medicine, expanded, changeExpanded, editMedicine, deleteMedicine }) => {
    const medicineName = medicine.medicineName;
    const unitName = medicine.unitName;
    const expirationDate = medicine.expirationDate;
    const indications = medicine.indications;
    const contraindications = medicine.contraindications;
    const description = medicine.description;
    const instruction = medicine.instruction;

    return (
        <Accordion sx={{ marginBottom: "20px" }} expanded={expanded === medicineName} onChange={changeExpanded(medicineName)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">{medicineName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography><i>Назва лікарського засобу:</i> <b>{medicineName}</b></Typography>
                <Typography><i>В чому вимірюється:</i> {unitName}</Typography>
                <Typography><i>Термін придатності:</i> {expirationDate}</Typography>
                <Typography><i>Показання:</i> {indications}</Typography>
                <Typography><i>Протипоказання:</i> {contraindications}</Typography>
                <Typography><i>Опис:</i> {description}</Typography>
                <Typography><i>Інструкція використання:</i> {instruction}</Typography>

                <ButtonGroup variant="outlined" sx={{ float: "right", margin: "0 0 20px 0" }}>
                    <Button color="primary" sx={{ marginTop: "20px" }} onClick={() => editMedicine(medicine)}>
                        <EditIcon />
                    </Button>

                    <Button color="error" sx={{ marginTop: "20px" }} onClick={() => deleteMedicine(medicine.idMedicine)}>
                        <DeleteIcon />
                    </Button>
                </ButtonGroup>
            </AccordionDetails>
        </Accordion>
    );
};

export default MedicineItem;