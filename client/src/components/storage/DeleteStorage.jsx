import React from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import StorageRequest from "../../api/requests/storage.request";

const DeleteStorage = ({ id, onDone }) => {
    const handleDeleteClick = (id) => {
        StorageRequest.deleteStorageMedicine(id)
            .then(() => onDone(id))
            .catch(err => console.log(err));
    };

    return (
        <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
        />
    );
};

export default DeleteStorage;