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

const styleBody = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
};

const styleListCard = {
    padding: 2,
    margin: "50px 20px",
    display: "flex",
    justifyContent: "center",
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
    const closeDeleteUserDialog = () => setDeleteUserDialog(false);

    const handleEditUserDone = (updatedUser) => {
        setUser({ ...user, ...updatedUser });
        closeEditUserModal();
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
                <Card sx={styleCard}>
                    <CardContent>
                        <Typography variant="h3" textAlign="center" gutterBottom>{user.username}</Typography>

                        <Typography variant="h5" mb={3}><i>Роль:</i> {user.role}</Typography>
                        <Typography variant="h5" mb={3}><i>Шпиталь:</i> {user.hospital.nameHospital}</Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                            <TextField disabled label="Ім'я" value={user.firstName} />
                            <TextField disabled label="Прізвище" value={user.lastName} />
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
            </Box>
            <ToastContainer />
        </Box>
    );
}

export default Profile;