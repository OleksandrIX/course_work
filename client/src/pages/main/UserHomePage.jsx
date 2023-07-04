import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress, Modal } from "@mui/material";

import ProductionBatch from "../../api/requests/productionBatch.request";
import User from "../../api/requests/user.request";
import ListProductionBatches from "../../components/productionBatch/ListProductionBatches";
import CreateProductionBatch from "../../components/productionBatch/CreateProductionBatch";

import { ToastContainer, toast } from "react-toastify";
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
    padding: "0 20px"
};

const UserHomePage = () => {
    const [user, setUser] = useState(null);
    const [hospital, setHospital] = useState(null);
    const [productionBatches, setProductionBatches] = useState([]);
    const [openAddProductionBatchModal, setOpenAddProductionBatchModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isReload, setIsReaload] = useState(false);

    const [medicinesInBatch, setMedicinesInBatch] = useState([]);

    useEffect(() => {
        User.getCurrentUser()
            .then(({ data }) => setUser(data.user))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (user) setHospital(user.hospital);
    }, [user]);

    useEffect(() => {
        if (hospital || isReload) {
            ProductionBatch.getMedicineInBatchByHospitalId(hospital.idHospital)
                .then(({ data }) => setProductionBatches(data))
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false));
            setIsReaload(false);
        }
    }, [hospital, isReload]);

    const closeAddProductionBatchModal = () => setOpenAddProductionBatchModal(false);

    const handlerSavingProductionBatch = (responseData) => {
        responseData.batch.hospitalId = hospital.idHospital;
        const promise = ProductionBatch.createProductionBatch(responseData);

        toast.promise(promise, {
            pending: "Збереження партії лікарських засобів...",
            success: "Партія лікарських засобів збережено",
            error: "Помилка при збереженні",
        }, { ...errorToastOptions });

        promise
            .then(() => {
                setMedicinesInBatch([]);
                closeAddProductionBatchModal();
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
            });
    };

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
        <Box display="flex" height="90%" flex="1">
            <Box width="33%" display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h3" mt="20px">{hospital.nameHospital}</Typography>
                <Typography variant="h4" mt="10px" gutterBottom>Наявні лікарські засоби</Typography>

                <Button
                    sx={{ padding: "0 20px", fontSize: "20px" }}
                    variant="contained"
                    onClick={() => setOpenAddProductionBatchModal(true)}
                >
                    Додати партію лікарських засобів
                </Button>
            </Box>
            <Box width="67%" >
                <Box padding="20px">
                    <ListProductionBatches batches={productionBatches} deleteProductionBatch={deleteProductionBatch} />
                </Box>
            </Box>

            <Modal open={openAddProductionBatchModal} onClose={closeAddProductionBatchModal}>
                <Box sx={styleModal}>
                    <CreateProductionBatch
                        onDone={handlerSavingProductionBatch}
                        medicinesInBatch={medicinesInBatch}
                        setMedicinesInBatch={setMedicinesInBatch}
                    />
                </Box>
            </Modal>

            <ToastContainer />
        </Box>
    );
};

export default UserHomePage;