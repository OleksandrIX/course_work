import React from "react";
import { Button, Box, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const DeleteMedicineDialog = ({ onDelete, onClose }) => {
    const handleDelete = () => onDelete();
    const handleClose = () => onClose();

    return (
        <Box>
            <DialogTitle>Видалення лікарського засобу</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Ви дійсно бажаєте видалити лікарський засіб?
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

export default DeleteMedicineDialog;