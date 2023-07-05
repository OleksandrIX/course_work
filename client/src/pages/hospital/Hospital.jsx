import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Auth from "../../api/requests/auth.request";
import HospitalRequest from "../../api/requests/hospital.request";
import Loader from "../../components/Loader";
import Header from "../../components/Header";

import AddHospital from "../../components/hospital/AddHospital";
import EditHospital from "../../components/hospital/EditHospital";
import DeleteHospital from "../../components/hospital/DeleteHospital";

import { ToastContainer } from "react-toastify";

const styleBody = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
};

const Hospital = () => {
    const columns = [
        {
            field: "id",
            headerName: "№",
            width: 50,
        },
        {
            field: "nameHospital",
            headerName: "Назва шпиталя",
            width: 300
        },
        {
            field: "actions",
            type: "actions",
            width: 80,
            getActions: ({ row }) => {
                const id = row.idHospital;
                return [
                    <EditHospital id={id} hospital={row} onDone={editHospital} />,
                    <DeleteHospital id={id} onDone={deleteHospital} />,
                ];
            }
        },
    ];

    const navigate = useNavigate();
    const [hospitals, setHospitals] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Шпиталі";
        Auth.checkAuth()
            .then(() => setIsAuth(true))
            .catch(() => navigate("/login"))
            .finally(() => setIsLoading(false));
    }, [navigate]);

    useEffect(() => {
        if (isAuth)
            HospitalRequest.getAllHospitals()
                .then(({ data }) => setHospitals(data.hospitals))
                .catch(err => console.log(err));
    }, [isAuth]);

    const addHospital = (hospital) => setHospitals(prev => [...prev, hospital]);

    const editHospital = (id, updatedHospital) => {
        setHospitals(prev => prev.map((hospital) => {
            if (hospital.idHospital === id) {
                return { ...hospital, ...updatedHospital };
            }
            return hospital;
        }));
    };

    const deleteHospital = (id) => setHospitals(prev => prev.filter((hospital) => hospital.idHospital !== id));

    if (isLoading) return (<Loader />);

    return (
        <Box sx={styleBody}>
            <Header isAuth={isAuth} />
            <Box display="flex" justifyContent="center" mt={8} flex="1">
                <Box width="30vw" height="57vh">
                    <Typography variant="h4" textAlign="center" gutterBottom>Військові шпиталі</Typography>
                    <DataGrid
                        columns={columns}
                        rows={hospitals.map((hospital, index) => ({ ...hospital, id: index + 1 }))}
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
                            toolbar: () => <AddHospital onDone={addHospital} />,
                            noRowsOverlay: () => {
                                return (
                                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                        <Typography variant="button">Немає даних для відображення</Typography>
                                    </Box>
                                );
                            },
                        }}
                    />
                </Box>
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default Hospital;