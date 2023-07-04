import React from "react";
import MedicineInBatchItem from "./MedicineInBatchItem";
import { Box } from "@mui/material";

const ListMedicineInBatch = ({ medicinesInBatch, openEditModal, deleteMedicineInBatch }) => {

    return (
        <Box display="flex" flexDirection="column" gap="10px">
            {medicinesInBatch.map((medicineInBatch, index) => (
                <MedicineInBatchItem
                    key={index}
                    medicineInBatch={medicineInBatch}
                    openEditModal={openEditModal}
                    deleteMedicineInBatch={deleteMedicineInBatch}
                />
            ))}
        </Box>
    );
};

export default ListMedicineInBatch;