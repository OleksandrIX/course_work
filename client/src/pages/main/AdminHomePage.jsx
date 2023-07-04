import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

import ProductionBatch from "../../api/requests/productionBatch.request";
import ListProductionBatches from "../../components/productionBatch/ListProductionBatches";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { errorToastOptions } from "../../util/toast.options";

const AdminHomePage = () => {
    const [hospitals, setHospitals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isReload, setIsReaload] = useState(true);

    useEffect(() => {
        if (isReload) {
            ProductionBatch.getAllBatchesAndMedicines()
                .then(({ data }) => setHospitals(data))
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false));
            setIsReaload(false);
        }
    }, [isReload]);

    const deleteProductionBatch = (serialNumberBatch) => {
        const promiseDelete = ProductionBatch.deleteProductionBatch(serialNumberBatch);

        toast.promise(promiseDelete, {
            pending: " Видалення партії лікарських засобів...",
            success: "Партія лікарських засобів видалена",
            error: "Помилка при видаленні",
        }, { ...errorToastOptions });

        promiseDelete
            .then(() => {
                setIsReaload(true);
            })
            .catch((err) => {
                const { message } = err.response.data;
                if (toast.isActive("error-toast")) {
                    toast.update("error-toast", {
                        render: message,
                        ...errorToastOptions,
                    });
                } else {
                    toast.error(message, {
                        toastId: "error-toast",
                        ...errorToastOptions,
                    });
                }
            })
    };

    if (isLoading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" flex="1">
                <CircularProgress />
            </Box>
        );

    return (
        <Box display="flex" height="90%">
            <Box width="100%" display="flex" flexDirection="column" mt={2}>
                {hospitals.map((hospital, index) => (
                    <Box key={index}>
                        <Typography textAlign="center" variant="h4">{hospital.hospital.nameHospital}</Typography>
                        <ListProductionBatches batches={hospital.batches} deleteProductionBatch={deleteProductionBatch} />
                    </Box>
                ))}
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default AdminHomePage;