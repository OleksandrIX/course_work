import React, { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Modal, Typography } from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Medicine from "../../api/requests/medicine.request";

const MedicineInBatchItem = ({ medicineInBatch, openEditModal, deleteMedicineInBatch }) => {
    const [medicine, setMedicine] = useState("");
    const [openShowDetailsMedicine, setOpenShowDetailsMedicine] = useState(false);

    useEffect(() => {
        Medicine.getOneMedicineById(medicineInBatch.medicineId)
            .then(({ data }) => setMedicine(data))
            .catch(err => console.log(err));
    }, []);

    const closeShowDetailsMedicine = () => setOpenShowDetailsMedicine(false);

    return (
        <Box display="flex" gap="10px" alignItems="center" justifyContent="space-between" border="1px solid black" borderRadius="5px" p={1}>
            <Typography component="div">
                <Typography variant="h6" textAlign="center">Серійний номер</Typography>
                <Typography textAlign="center">{medicineInBatch.serialNumberMedicine}</Typography>
            </Typography>

            <Typography component="div">
                <Typography variant="h6" textAlign="center">Виробник</Typography>
                <Typography textAlign="center" sx={{ width: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {medicineInBatch.producer}
                </Typography>
            </Typography>

            <Typography component="div">
                <Typography variant="h6" textAlign="center">Дата виробництва</Typography>
                <Typography textAlign="center">{medicineInBatch.productionDate}</Typography>
            </Typography>

            <Typography component="div">
                <Typography variant="h6" textAlign="center">Кількість</Typography>
                <Typography textAlign="center">{medicineInBatch.medicineQuantity}</Typography>
            </Typography>

            <Typography component="div">
                <Typography variant="h6" textAlign="center">Назва</Typography>
                <Typography textAlign="center" sx={{ cursor: "pointer" }} onClick={() => setOpenShowDetailsMedicine(true)}>
                    {medicine.medicineName}
                </Typography>

                <Modal open={openShowDetailsMedicine} onClose={closeShowDetailsMedicine}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        padding: "0 20px"
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
                </Modal>
            </Typography>

            <ButtonGroup variant="outlined">
                <Button color="primary" onClick={()=> openEditModal(medicineInBatch)}>
                    <EditIcon />
                </Button>

                <Button color="error" onClick={() => deleteMedicineInBatch(medicineInBatch.serialNumberMedicine)}>
                    <DeleteIcon />
                </Button>
            </ButtonGroup>
        </Box>
    )
};

export default MedicineInBatchItem;