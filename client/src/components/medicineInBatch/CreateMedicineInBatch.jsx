import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from "dayjs";

import Medicine from "../../api/requests/medicine.request";
import Loader from "../Loader";

const styleForm = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px 10px",
    borderRadius: "10px",
};

const CreateMedicineInBatch = ({ onDone }) => {
    const [serialNumberMedicine, setSerialNumberMedicine] = useState("");
    const [productionDate, setProductionDate] = useState(dayjs());
    const [producer, setProducer] = useState("");
    const [medicineQuantity, setMedicineQuantity] = useState(1);
    const [medicineId, setMedicineId] = useState("");
    const [medicines, setMedicines] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Medicine.getAllMedicines()
            .then(({ data }) => setMedicines(data.medicines))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const medicineInBatchData = {
            serialNumberMedicine,
            productionDate: productionDate.format("YYYY-MM-DD"),
            producer,
            medicineQuantity,
            medicineId
        };
        onDone(medicineInBatchData);
    };

    const handleSerialNumberMedicineChange = (event) => {
        const input = event.target.value;
        let formattedInput = input.replace(/[^A-Za-z0-9]/g, "");

        if (formattedInput.length > 15) formattedInput = formattedInput.slice(0, 15);

        formattedInput = formattedInput
            .replace(/(.{7})(.{1})/, "$1-$2")
            .replace(/(.{12})(.{1})/, "$1-$2");

        setSerialNumberMedicine(formattedInput);
    };

    if (isLoading) return (<Loader />);

    return (
        <Box sx={styleForm} component="form" onSubmit={handleSubmit}>
            <Typography sx={{ margin: "0 auto", fontSize: "30px", fontWeight: "bold" }} component="h5">
                Додати лікарський засіб
            </Typography>

            <TextField
                name="serialNumberMedicine"
                label="Серійний номер лікарського засобу"
                variant="outlined"
                required autoFocus
                inputProps={{ minLength: 17, maxLength: 17 }}
                value={serialNumberMedicine}
                onChange={handleSerialNumberMedicineChange}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    name="productionDate"
                    label="Дата виробництва"
                    defaultValue={productionDate}
                    onChange={(date) => setProductionDate(date)}
                />
            </LocalizationProvider>

            <TextField
                name="producer"
                label="Виробник"
                variant="outlined"
                required
                value={producer}
                onChange={(e) => setProducer(e.target.value)}
            />

            <TextField
                name="medicineQuantity"
                label="Кількість лікарського засобу"
                variant="outlined"
                type="number"
                required
                defaultValue={medicineQuantity}
                onChange={(e) => setMedicineQuantity(e.target.value)}
                InputProps={{ inputProps: { min: 1, max: 1000 }, inputMode: "numeric" }}
            />

            <FormControl required>
                <InputLabel required>Лікарський засіб</InputLabel>
                <Select
                    label="Лікарський засіб"
                    value={medicineId}
                    required
                    onChange={(e) => setMedicineId(e.target.value)}
                >
                    {medicines.map((medicine, index) => (
                        <MenuItem key={index} value={medicine.idMedicine}>{medicine.medicineName}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button sx={{ fontWeight: "bold", fontSize: "24px" }}
                variant="contained"
                color="primary"
                type="submit"
            >
                Додати
            </Button>
        </Box>
    );
};

export default CreateMedicineInBatch;