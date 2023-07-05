import React from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import HospitalRequest from "../../api/requests/hospital.request";

const DeleteHospital = ({ id, onDone }) => {
    const handleDeleteClick = (id) => {
        HospitalRequest.deleteHospital(id)
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

export default DeleteHospital;