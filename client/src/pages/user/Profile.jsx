import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button, Card, CardContent, TextField, ButtonGroup, Modal, Dialog } from "@mui/material";
import { ToastContainer } from 'react-toastify';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Auth from "../../api/requests/auth.request";
import User from "../../api/requests/user.request";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import ChangePasswordForm from "../../components/auth/ChangePasswordForm";
import EditUserFrom from "../../components/user/EditUserForm";
import DeleteUserDialog from "../../components/user/DeleteUserDialog";
import EditAddress from "../../components/address/EditAddress";

const styleBody = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
};

const styleListCard = {
    padding: 2,
    margin: "10px 20px",
    display: "flex",
    gap: "20px"
};

const styleCard = {
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: 20,
    p: 2
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

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [editUserModal, setEditUserModal] = useState(false);
    const [editPasswordModal, setEditPasswordModal] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [editAddressModal, setEditAddressModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Облік лікарських засобів";
        Auth.checkAuth()
            .then(async () => {
                setIsAuth(true);
                const currentUser = (await User.getCurrentUser()).data;
                setUser(currentUser.user);
            })
            .catch(() => navigate("/login"))
            .finally(() => setIsLoading(false));
    }, [navigate]);

    const closeEditPasswordModal = () => setEditPasswordModal(false);
    const closeEditUserModal = () => setEditUserModal(false);
    const closeEditAddressModal = () => setEditAddressModal(false);
    const closeDeleteUserDialog = () => setDeleteUserDialog(false);

    const handleEditUserDone = (updatedUser) => {
        setUser({ ...user, ...updatedUser });
        closeEditUserModal();
    };

    const handleEditUserAddress = (updatedAddress) => {
        const updatedUser = { ...user };
        updatedUser.address = updatedAddress;
        setUser(updatedUser);
        closeEditAddressModal();
    };

    const deleteUser = async () => {
        closeDeleteUserDialog();
        await User.deleteUser(user.idUser);
        await Auth.logout();
        navigate("/login");
    };

    if (isLoading) return (<Loader />);

    if (user.role === "ADMIN") navigate("/");
    else return (
        <Box sx={styleBody}>
            <Header isAuth={isAuth} />
            <Box sx={styleListCard}>
                <Card sx={{ ...styleCard, width: "40%" }}>
                    <CardContent>
                        <Typography variant="h3" textAlign="center" gutterBottom>{user.username}</Typography>
                        <Typography variant="h5" mb={3}>Роль: {user.role}</Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", gap: "20px" }} >
                                <TextField disabled label="Ім'я" value={user.firstName} />
                                <TextField disabled label="Прізвище" value={user.lastName} />
                            </Box>

                            <TextField disabled fullWidth label="Посада" value={user.position} />
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between", gap: "10px", margin: "0 10px" }}>
                            <Button variant="contained" color="primary" sx={{ marginTop: "20px" }} onClick={() => setEditPasswordModal(true)} fullWidth>
                                Змінити пароль
                            </Button>

                            <ButtonGroup variant="outlined">
                                <Button color="primary" sx={{ marginTop: "20px" }} onClick={() => setEditUserModal(true)}>
                                    <EditIcon />
                                </Button>

                                <Button color="error" sx={{ marginTop: "20px" }} onClick={() => setDeleteUserDialog(true)}>
                                    <DeleteIcon />
                                </Button>
                            </ButtonGroup>
                        </Box>
                    </CardContent>

                    <Modal open={editPasswordModal} onClose={closeEditPasswordModal}>
                        <Box sx={styleModal}>
                            <ChangePasswordForm idUser={user.idUser} onDone={closeEditPasswordModal} />
                        </Box>
                    </Modal>

                    <Modal open={editUserModal} onClose={closeEditUserModal}>
                        <Box sx={styleModal}>
                            <EditUserFrom user={user} onDone={handleEditUserDone} />
                        </Box>
                    </Modal>

                    <Dialog open={deleteUserDialog} onClose={closeDeleteUserDialog}>
                        <DeleteUserDialog onClose={closeDeleteUserDialog} onDelete={deleteUser} />
                    </Dialog>
                </Card>

                <Card sx={styleCard}>
                    <CardContent>
                        <Typography variant="h3" textAlign="center" gutterBottom>Адреса</Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                            <TextField disabled label="Місто" value={user.address ? user.address.city : ""} />
                            <Box sx={{ display: "flex", justifyContent: "space-between", gap: "20px" }} >
                                <TextField disabled label="Вулиця" value={user.address ? user.address.street : ""} />
                                <TextField disabled label="Номер вулиці" value={user.address ? user.address.numberStreet : ""} />
                            </Box>
                        </Box>

                        <Button variant="contained" color="primary"
                            sx={{ marginTop: "20px", float: "right" }}
                            onClick={() => setEditAddressModal(true)}>
                            Редагувати адресу
                        </Button>
                    </CardContent>

                    <Modal open={editAddressModal} onClose={closeEditAddressModal}>
                        <Box sx={styleModal}>
                            <EditAddress idUser={user.idUser}
                                address={user.address ? user.address : { city: "", street: "", numberStreet: "" }}
                                onDone={handleEditUserAddress} />
                        </Box>
                    </Modal>
                </Card>

                <Card sx={styleCard}>
                    <CardContent>
                        <Typography variant="h3" textAlign="center" gutterBottom>Шпиталь</Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                            <TextField disabled label="Назва шпиталю" value={user.hospital ? user.hospital.nameHospital : ""} />
                            <TextField disabled label="Місто" value={user.hospital ? user.hospital.address.city : ""} />

                            <Box sx={{ display: "flex", justifyContent: "space-between", gap: "20px" }} >
                                <TextField disabled label="Вулиця" value={user.hospital ? user.hospital.address.street : ""} />
                                <TextField disabled label="Номер вулиці" value={user.hospital ? user.hospital.address.numberStreet : ""} />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <ToastContainer />
        </Box>
    );
}

export default Profile;