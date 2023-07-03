import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Auth from "../../api/requests/auth.request";
import User from "../../api/requests/user.request";
import MedicineReq from "../../api/requests/medicine.request";

import { Box, Button, Typography, Modal, Dialog } from "@mui/material";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import MedicineItems from "../../components/medicine/MedicineItems";
import CreateMedicine from "../../components/medicine/CreateMedicine";
import DeleteMedicineDialog from "../../components/medicine/DeleteMedicineDialog";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { errorToastOptions } from "../../util/toast.options";
import EditMedicine from "../../components/medicine/EditMedicineModal";

const styleBody = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
};

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

const Medicine = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [medicines, setMedicines] = useState([]);
    const [openAddMedicineModal, setOpenAddMedicineModal] = useState(false);
    const [editableMedicine, setEditableMedicine] = useState(null);
    const [openEditMedicineModal, setOpenEditMedicineModal] = useState(false);
    const [deletableMedicine, setDeletableMedicine] = useState(0);
    const [openDeleteMedicineDialog, setOpenDeleteMedicineDialog] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Облік лікарських засобів";
        Auth.checkAuth()
            .then(async () => {
                setIsAuth(true);
                const currentUser = (await User.getCurrentUser()).data;
                setUser(currentUser.user);
                const medicinesRes = (await MedicineReq.getAllMedicines()).data;
                setMedicines(medicinesRes.medicines);
            })
            .catch(() => navigate("/login"))
            .finally(() => setIsLoading(false));
    }, [navigate]);

    const closeAddMedicineModal = () => setOpenAddMedicineModal(false);
    const closeEditMedicineModal = () => setOpenEditMedicineModal(false);
    const closeDeleteMedicineDialog = () => setOpenDeleteMedicineDialog(false);

    const addMedicine = (medicine) => {
        setMedicines(prev => [...prev, medicine]);
        closeAddMedicineModal();
    };

    const openEdit = (medicine) => {
        setEditableMedicine(medicine);
        setOpenEditMedicineModal(true);
    };

    const editMedicine = (updatedMedicine) => {
        setMedicines(prev => prev.map((medicine) => medicine.idMedicine === updatedMedicine.idMedicine ? updatedMedicine : medicine));
        setOpenEditMedicineModal(false);
    };

    const openDelete = (id) => {
        setDeletableMedicine(id);
        setOpenDeleteMedicineDialog(true);
    };

    const deleteMedicine = () => {
        const deletePromise = MedicineReq.deleteMedicine(deletableMedicine);
        toast.promise(deletePromise, {
            pending: "Видалюється...",
            error: "Помилка під час видалення",
            success: "Лікарський засіб видалено"
        }, { ...errorToastOptions });

        deletePromise
            .then(() => setMedicines(prev => prev.filter((medicine) => medicine.idMedicine !== deletableMedicine)))
            .catch(() => { });

        setOpenDeleteMedicineDialog(false);
    };

    if (isLoading) return (<Loader />);

    if (user.role !== "ADMIN") navigate("/");
    else return (
        <Box sx={styleBody}>
            <Header isAuth={isAuth} />
            <Box sx={{ position: "relative" }}>
                <Box sx={{ margin: "20px", position: "fixed", left: "20px" }}>
                    <Typography variant="h4" sx={{ marginBottom: 2 }} textAlign="center">Лікарськи засоби</Typography>
                    <Button variant="contained" sx={{ marginBottom: 2 }} onClick={() => setOpenAddMedicineModal(true)}>
                        Створити новий лікарський засіб
                    </Button>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <MedicineItems medicines={medicines} editMedicine={openEdit} deleteMedicine={openDelete} />
                </Box>
            </Box>

            <Modal open={openAddMedicineModal} onClose={closeAddMedicineModal}>
                <Box sx={styleModal}>
                    <CreateMedicine onDone={addMedicine} />
                </Box>
            </Modal>

            <Modal open={openEditMedicineModal} onClose={closeEditMedicineModal}>
                <Box sx={styleModal}>
                    <EditMedicine onDone={editMedicine} medicine={editableMedicine} />
                </Box>
            </Modal>

            <Dialog open={openDeleteMedicineDialog} onClose={closeDeleteMedicineDialog}>
                <DeleteMedicineDialog
                    onClose={closeDeleteMedicineDialog}
                    onDelete={deleteMedicine}
                />
            </Dialog>
            <ToastContainer />
        </Box >
    );
};

export default Medicine;