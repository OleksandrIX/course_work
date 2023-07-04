import React, { useState } from "react";

import { Box, TextField, Typography, Button, Modal } from "@mui/material";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from "dayjs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToastOptions } from "../../util/toast.options";
import CreateMedicineInBatch from "../medicineInBatch/CreateMedicineInBatch";
import EditMedicineBatch from "../medicineInBatch/EditMedicineBatch";
import ListMedicineInBatch from "../medicineInBatch/ListMedicineInBatch";

import MedicineInBatch from "../../api/requests/medicineInBatch.request";

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: "0 20px"
};

const styleForm = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px 10px",
    borderRadius: "10px",
    width: "70vw",
    height: "90vh",
};

const CreateProductionBatch = ({ onDone, medicinesInBatch, setMedicinesInBatch }) => {
    const [serialNumberBatch, setSerialNumberBatch] = useState("");
    const [dateBatchReceipt, setDateBatchReceipt] = useState(dayjs());

    const [openAddMedicineInBatchModal, setOpenAddMedicineInBatchModal] = useState(false);
    const [openEditMedicineInBatchModal, setOpenEditMedicineInBatchModal] = useState(false);
    const [openCreateProductionBatchModal, setOpenCreateProductionBatchModal] = useState(false);

    const [editableMedicineInBatch, setEditableMedicineInBatch] = useState(null);

    const closeAddMedicineInBatchModal = () => setOpenAddMedicineInBatchModal(false);
    const closeEditMedicineInBatchModal = () => setOpenEditMedicineInBatchModal(false);
    const closeCreateProductionBatchModal = () => setOpenCreateProductionBatchModal(false);

    const saveProductionBatch = (event) => {
        event.preventDefault();

        const responseData = {
            batch: { serialNumberBatch, dateBatchReceipt: dateBatchReceipt.format("YYYY-MM-DD") },
            medicinesInBatch,
        };

        onDone(responseData);
    };

    const handleSerialNumberBatchChange = (event) => {
        const input = event.target.value;
        let formattedInput = input.replace(/[^A-Za-z0-9]/g, "");

        if (formattedInput.length > 15) formattedInput = formattedInput.slice(0, 15);

        formattedInput = formattedInput
            .replace(/(.{7})(.{1})/, "$1-$2")
            .replace(/(.{12})(.{1})/, "$1-$2");

        setSerialNumberBatch(formattedInput);
    };

    const handlerAddingMedicineInBatch = async (medicineInBatchData) => {
        try {
            const response = await MedicineInBatch.getMedicineInBatchBySerialNumber(medicineInBatchData.serialNumberMedicine)
            if (response) {
                if (toast.isActive("error-toast")) {
                    toast.update("error-toast", {
                        render: "Лікарський засіб з таким серійним номером вже існує",
                        ...errorToastOptions,
                    })
                } else {
                    toast.error("Лікарський засіб з таким серійним номером вже існує", {
                        toastId: "error-toast",
                        ...errorToastOptions,
                    })
                }
                return;
            }
        } catch {
            if (medicinesInBatch.length === 0) {
                setMedicinesInBatch(prev => [...prev, medicineInBatchData]);
                closeAddMedicineInBatchModal();
                return;
            }

            const isExists = medicinesInBatch.some((item) => item.serialNumberMedicine === medicineInBatchData.serialNumberMedicine);
            if (isExists) {
                if (toast.isActive("error-toast")) {
                    toast.update("error-toast", {
                        render: "Лікарський засіб з таким серійним номером вже існує",
                        ...errorToastOptions,
                    })
                } else {
                    toast.error("Лікарський засіб з таким серійним номером вже існує", {
                        toastId: "error-toast",
                        ...errorToastOptions,
                    })
                }
            } else {
                setMedicinesInBatch(prev => [...prev, medicineInBatchData]);
                closeAddMedicineInBatchModal();
            }
        }
    };

    const handlerEditingMedicineInBatch = (medicineInBatchData) => {
        const updatedMedicines = medicinesInBatch.map((medicine) => {
            if (medicine.serialNumberMedicine === medicineInBatchData.serialNumberMedicine) {
                return medicineInBatchData;
            }
            return medicine;
        });
        setMedicinesInBatch(updatedMedicines);
        closeEditMedicineInBatchModal();
    };

    const deleteMedicineInBatch = (serialNumberMedicine) => {
        setMedicinesInBatch(prevState => prevState.filter(item => item.serialNumberMedicine !== serialNumberMedicine));
    };

    return (
        <Box sx={styleForm} component="form">
            <Typography sx={{ margin: "0 auto", fontSize: "30px", fontWeight: "bold" }} component="h5">
                Створити партію лікарських засобів
            </Typography>

            <Box flex="1" border="1px solid black" borderRadius="10px" p={2} sx={{ overflowY: "auto" }}>
                {medicinesInBatch.length === 0 ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <Typography variant="h5" p={2} border="1px solid #787C7E" borderRadius="10px">Додайте лікарський засіб</Typography>
                    </Box>
                ) : (
                    <ListMedicineInBatch
                        medicinesInBatch={medicinesInBatch}
                        openEditModal={(medicineInBatch) => {
                            setEditableMedicineInBatch(medicineInBatch);
                            setOpenEditMedicineInBatchModal(true);
                        }}
                        deleteMedicineInBatch={deleteMedicineInBatch}
                    />
                )}
            </Box>

            <Box display="flex" gap="20px" ml={1} mr={1}>
                <Button sx={{ fontWeight: "bold", fontSize: "24px" }} fullWidth
                    variant="contained"
                    color="info"
                    type="button"
                    onClick={() => setOpenAddMedicineInBatchModal(true)}
                >
                    Додати лікарський засіб
                </Button>

                <Button sx={{ fontWeight: "bold", fontSize: "24px" }} fullWidth
                    variant="contained"
                    color="success"
                    type="button"
                    onClick={() => {
                        if (medicinesInBatch.length === 0) {
                            if (toast.isActive("error-toast")) {
                                toast.update("error-toast", {
                                    render: "Потрібно додати принаймі один лікарський засіб",
                                    ...errorToastOptions,
                                });
                            } else {
                                toast.error("Потрібно додати принаймі один лікарський засіб", {
                                    toastId: "error-toast",
                                    ...errorToastOptions,
                                });
                            }
                        } else {
                            setOpenCreateProductionBatchModal(true);
                        }
                    }}
                >
                    Зберегти
                </Button>
            </Box>

            <Modal open={openAddMedicineInBatchModal} onClose={closeAddMedicineInBatchModal}>
                <Box sx={styleModal}>
                    <CreateMedicineInBatch onDone={handlerAddingMedicineInBatch} />
                </Box>
            </Modal>

            <Modal open={openEditMedicineInBatchModal} onClose={closeEditMedicineInBatchModal}>
                <Box sx={styleModal}>
                    <EditMedicineBatch
                        medicineInBatch={editableMedicineInBatch}
                        onDone={handlerEditingMedicineInBatch} />
                </Box>
            </Modal>

            <Modal open={openCreateProductionBatchModal} onClose={closeCreateProductionBatchModal}>
                <Box sx={styleModal}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        padding: "20px 10px",
                        borderRadius: "10px",
                    }} component="form" onSubmit={saveProductionBatch}>
                        <Typography sx={{ margin: "0 auto", fontSize: "30px", fontWeight: "bold" }} component="h5">
                            Додати партію лікарських засобів
                        </Typography>

                        <TextField
                            name="serialNumberBatch"
                            label="Серійний номер партії"
                            variant="outlined"
                            required autoFocus
                            inputProps={{ minLength: 17, maxLength: 17 }}
                            value={serialNumberBatch}
                            onChange={handleSerialNumberBatchChange}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                name="productionDate"
                                label="Дата виробництва"
                                defaultValue={dateBatchReceipt}
                                onChange={(date) => setDateBatchReceipt(date)}
                            />
                        </LocalizationProvider>

                        <Button sx={{ fontWeight: "bold", fontSize: "24px" }}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Зберегти
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default CreateProductionBatch;