import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import MedicineRequest from "../../api/requests/medicine.request";
import StorageRequest from "../../api/requests/storage.request";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { errorToastOptions } from "../../util/toast.options";


const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: "0 20px",
    borderRadius: "10px"
};

const styleForm = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px 10px",
    borderRadius: "10px",
};

const EditStorage = ({ id, storage, onDone }) => {
    const [deliveryDate, setDeliveryDate] = useState(dayjs(storage.deliveryDate));
    const [medicineQuantity, setMedicineQuantity] = useState(storage.medicineQuantity);
    const [selectedMedicine, setSelectedMedicine] = useState(storage.medicineId);
    const [medicines, setMedicines] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        MedicineRequest.getAllMedicines()
            .then(({ data }) => setMedicines(data.medicines))
            .catch(err => console.log(err));
    }, []);

    const closeModal = () => setOpenModal(false);

    const handleEditClick = (id) => setOpenModal(true);

    const handelSubmit = (event) => {
        event.preventDefault();

        const formData = {
            deliveryDate: deliveryDate.format("YYYY-MM-DD"),
            medicineQuantity: parseInt(medicineQuantity),
            medicineId: selectedMedicine,
            medicine: medicines.find(medicine => medicine.idMedicine === selectedMedicine),
        };

        StorageRequest.updateStorageMedicine(id, formData)
            .then(() => {
                onDone(id, formData);
                closeModal();
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message, { ...errorToastOptions });
            });
    };

    return (
        <>
            <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={() => handleEditClick(id)}
                color="inherit"
            />

            <Modal open={openModal} onClose={closeModal}>
                <Box sx={styleModal}>
                    <Box component="form" sx={styleForm} onSubmit={handelSubmit}>
                        <Typography variant="h5" component="h5" textAlign="center">
                            Редагувати запис
                        </Typography>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                required
                                name="deliveryDate"
                                label="Дата отримання"
                                defaultValue={deliveryDate}
                                onChange={(date) => setDeliveryDate(date)}
                            />
                        </LocalizationProvider>

                        <TextField
                            name="medicineQuantity"
                            label="Кількість лікарського засобу"
                            variant="outlined"
                            type="number"
                            required defaultValue={medicineQuantity}
                            onChange={(e) => setMedicineQuantity(e.target.value)}
                            InputProps={{ inputProps: { min: 1, max: 1000 }, inputMode: "numeric" }}
                        />

                        <FormControl required>
                            <InputLabel required>Лікарський засіб</InputLabel>
                            <Select
                                label="Лікарський засіб"
                                value={selectedMedicine} required
                                onChange={(e) => setSelectedMedicine(e.target.value)}
                            >
                                {medicines.map((medicine, index) => (
                                    <MenuItem key={index} value={medicine.idMedicine}>{medicine.medicineName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Редагувати
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default EditStorage;