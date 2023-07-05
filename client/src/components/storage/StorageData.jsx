import React, { useState, useEffect } from "react";
import { Box, Typography, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import MedicineDetails from "./MedicineDetails";
import AddStorage from "./AddStorage";
import EditStorage from "./EditStorage";
import DeleteStorage from "./DeleteStorage";

import StorageRequest from "../../api/requests/storage.request";

const StorageData = ({ hospital }) => {
    const columns = [
        {
            field: "id",
            headerName: "№",
            width: 50,
        },
        {
            field: "deliveryDate",
            headerName: "Дата отримання",
            width: 150,
        },
        {
            field: "medicineQuantity",
            headerName: "кількість",
            valueGetter: (params) => {
                const { value } = params;
                const { unitName } = params.row.medicine;
                return value + " " + unitName;
            },
        },
        {
            field: "medicineId",
            headerName: "Назва лікарського засобу",
            width: 200,
            valueGetter: (params) => {
                const medicine = params.row.medicine;
                return medicine.medicineName;
            },
        },
        {
            field: "actions",
            type: "actions",
            width: 80,
            getActions: ({ row }) => {
                const id = row.idStorage;
                return [
                    <EditStorage id={id} storage={row} onDone={editStorage} />,
                    <DeleteStorage id={id} onDone={deleteStorage} />,
                ];
            }
        }
    ];

    const [storages, setStorages] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);

    const closeDetailsModal = () => setOpenDetailsModal(false);

    useEffect(() => {
        if (hospital)
            StorageRequest.getAllStoragesByHospitalId(hospital.idHospital)
                .then(({ data }) => setStorages(data))
                .catch((err) => console.log(err));
    }, [hospital]);

    const addStorage = (storage) => setStorages(prev => [...prev, storage]);

    const editStorage = (id, updatedStorage) => {
        setStorages(prev => prev.map((storage) => {
            if (storage.idStorage === id) {
                return { ...storage, ...updatedStorage };
            }
            return storage;
        }));
    };

    const deleteStorage = (id) => setStorages(prev => prev.filter((storage) => storage.idStorage !== id));

    return (
        <Box>
            <Typography variant="h3" m={4}>{hospital?.nameHospital}</Typography>
            <Box width="40vw" height="57vh">
                <DataGrid
                    columns={columns}
                    rows={storages.map((storage, index) => ({ ...storage, id: index + 1 }))}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    slots={{
                        toolbar: () => <AddStorage hospitalId={hospital?.idHospital} onDone={addStorage} />,
                        noRowsOverlay: () => {
                            return (
                                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                    <Typography variant="button">Немає даних для відображення</Typography>
                                </Box>
                            );
                        },
                    }}
                    onCellClick={(params) => {
                        if (params.field === "medicineId") {
                            const { medicine } = params.row;
                            setSelectedMedicine(medicine);
                            setOpenDetailsModal(true);
                        }
                    }}
                />
            </Box>

            <Modal open={openDetailsModal} onClose={closeDetailsModal}>
                <><MedicineDetails medicine={selectedMedicine} /></>
            </Modal>

        </Box>
    );
};

export default StorageData;