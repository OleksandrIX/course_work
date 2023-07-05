import React, { useState } from "react";
import { Box, TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToastOptions } from "../../util/toast.options";

import Medicine from "../../api/requests/medicine.request";

const styleForm = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px 10px",
    borderRadius: "10px",
};

const styleBodyForm = {
    display: "flex",
    gap: "20px"
}

const columnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    flex: "1",
    width: "300px",
};

const EditMedicine = ({ medicine, onDone }) => {
    const [medicineName, setMedicineName] = useState(medicine.medicineName);
    const [unitName, setUnitName] = useState(medicine.unitName);
    const [expirationDate, setExpirationDate] = useState(medicine.expirationDate);
    const [indications, setIndications] = useState(medicine.indications);
    const [contraindications, setContraindications] = useState(medicine.contraindications);
    const [description, setDescription] = useState(medicine.description);
    const [instruction, setInstruction] = useState(medicine.instruction);

    const handleSubmit = (event) => {
        event.preventDefault();
        const medicineData = {
            idMedicine: medicine.idMedicine,
            medicineName,
            unitName,
            expirationDate,
            indications,
            contraindications,
            description,
            instruction
        };

        const editPromise = Medicine.updateMedicine(medicine.idMedicine, medicineData);

        toast.promise(editPromise, {
            pending: "Оновлюється...",
            error: "Помилка під час оновлення",
            success: "Лікарський засіб оновлено"
        }, { ...errorToastOptions });

        editPromise
            .then(() => {
                onDone(medicineData);
            })
            .catch((err) => {
                const { message } = err.response.data;
                if (toast.isActive("error-toast")) {
                    toast.update("error-toast", {
                        render: message,
                        ...errorToastOptions,
                    });
                } else {
                    toast.error(message, {
                        toastId: "error-toast",
                        ...errorToastOptions,
                    });
                }
            });
    };

    return (
        <Box sx={styleForm} component="form" onSubmit={handleSubmit}>
            <Typography sx={{ margin: "auto", fontSize: "30px", fontWeight: "bold" }} component="h5">Редагувати лікарський засіб</Typography>

            <Box sx={styleBodyForm}>
                <Box sx={columnStyle}>
                    <TextField
                        name="medicineName"
                        label="Назва лікарського засобу"
                        variant="outlined"
                        required
                        autoFocus
                        value={medicineName}
                        onChange={(e) => setMedicineName(e.target.value)}
                    />

                    <FormControl variant="outlined" required>
                        <InputLabel>Одиниця виміру</InputLabel>
                        <Select
                            value={unitName}
                            onChange={(e) => setUnitName(e.target.value)}
                            label="Одиниця виміру"
                        >
                            <MenuItem value="таблетка">таблетка</MenuItem>
                            <MenuItem value="капсула">капсула</MenuItem>
                            <MenuItem value="ампула">ампула</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        name="expirationDate"
                        label="Термін придатності"
                        variant="outlined"
                        required
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                    />

                    <TextField
                        name="description"
                        label="Опис"
                        variant="outlined"
                        required
                        multiline
                        rows={7}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Box>

                <Box sx={columnStyle}>
                    <TextField
                        name="indications"
                        label="Показання"
                        variant="outlined"
                        multiline
                        required
                        rows={4}
                        value={indications}
                        onChange={(e) => setIndications(e.target.value)}
                    />

                    <TextField
                        name="contraindications"
                        label="Протипоказання"
                        variant="outlined"
                        required
                        multiline
                        rows={4}
                        value={contraindications}
                        onChange={(e) => setContraindications(e.target.value)}
                    />

                    <TextField
                        name="instruction"
                        label="Інструкція"
                        variant="outlined"
                        required
                        multiline
                        rows={4}
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                    />
                </Box>
            </Box>

            <Button sx={{ fontWeight: "bold", fontSize: "24px" }}
                variant="contained"
                color="primary"
                type="submit">
                Редагувати
            </Button>
        </Box>
    );
};

export default EditMedicine;