import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';

import HospitalRequest from "../../api/requests/hospital.request";

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

const EditHospital = ({ id, hospital, onDone }) => {
    const [nameHospital, setNameHospital] = useState(hospital.nameHospital);
    const [openModal, setOpenModal] = useState(false);

    const closeModal = () => setOpenModal(false);

    const handleEditClick = () => setOpenModal(true);

    const handelSubmit = (event) => {
        event.preventDefault();
        const formData = { nameHospital };

        HospitalRequest.editHospital(id, formData)
            .then(() => {
                onDone(id, formData);
                toast.dismiss("error-toast");
                toast.success("Шпиталь редаговано", { ...errorToastOptions });
                closeModal();
            })
            .catch((err) => {
                if (err.response) {
                    if (toast.isActive("error-toast")) {
                        toast.update("error-toast", {
                            render: err.response.data.message,
                            ...errorToastOptions,
                        });
                    } else {
                        toast.error(err.response.data.message, {
                            toastId: "error-toast",
                            ...errorToastOptions,
                        });
                    }
                }
                console.log(err.message);
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
                            Редагувати шпиталь
                        </Typography>

                        <TextField
                            name="nameHospital"
                            label="Назва військового шпиталю"
                            variant="outlined"
                            required
                            autoFocus
                            value={nameHospital}
                            onChange={(e) => setNameHospital(e.target.value)}
                        />

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

export default EditHospital;