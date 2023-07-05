import React from "react";
import { Button, Box, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const DeleteUserDialog = ({ onDelete, onClose }) => {
    const handleDelete = () => onDelete();
    const handleClose = () => onClose();

    return (
        <Box>
            <DialogTitle>Видалення користувача</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Ви дійсно бажаєте видалити цього користувача?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Ні
                </Button>
                <Button onClick={handleDelete} color="error" autoFocus>
                    Так, видалити
                </Button>
            </DialogActions>
        </Box>
    );
};

export default DeleteUserDialog;