import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography, Modal, Box } from "@mui/material";

import MUIDataTable from "mui-datatables";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const columns = (handleOpenDetailsModal) => [
    {
        name: "serialNumberMedicine",
        label: "Серійний номер",
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: "productionDate",
        label: "Дата виробництва",
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: "producer",
        label: "Виробник",
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: "medicineQuantity",
        label: "Кількість",
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: "medicineName",
        label: "Назва лікарського засобу",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            handleOpenDetailsModal(value)
                        }}
                    >
                        {value}
                    </span>
                );
            },
        }
    },
];

const options = {
    filterType: "checkbox",
    download: false,
    textLabels: {
        body: {
            noMatch: "Лікарські засобі відсутні",
            toolTip: "Сортувати",
            columnHeaderTooltip: column => `Сортувати по ${column.label}`
        },
        pagination: {
            next: "Наступна сторінка",
            previous: "Попередня сторінка",
            rowsPerPage: "Рядки на сторінці:",
            displayRows: "з",
        },
        toolbar: {
            search: "Пошук",
            downloadCsv: "Завантажити CSV-файл",
            print: "Роздрукувати",
            viewColumns: "Переглянути колонки",
            filterTable: "Таблиця фільтрів",
        },
        filter: {
            all: "Всі",
            title: "ФІЛЬТРИ",
            reset: "СКИНУТИ",
        },
        viewColumns: {
            title: "Показати колонки",
            titleAria: "Показати/приховати стовпці таблиці",
        },
        selectedRows: {
            text: "ряд(и) вибрано",
            delete: "Видалити",
            deleteAria: "Видалення вибраних рядків",
        },
    }
};


const BatchAccordion = ({ batch, expanded, changeExpanded, deleteProductionBatch }) => {
    const [openShowDetailsMedicine, setOpenShowDetailsMedicine] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);

    const closeShowDetailsMedicine = () => setOpenShowDetailsMedicine(false);

    const handleOpenDetailsModal = (medicine) => {
        let data;
        for (const medicineData of batch.medicines)
            if (medicineData.medicineData.medicineName === medicine) data = medicineData.medicineData;
        setSelectedMedicine(data);
        setOpenShowDetailsMedicine(true);
    };

    return (
        <Accordion sx={{ marginBottom: "20px" }} expanded={expanded === batch.serialNumberBatch} onChange={changeExpanded(batch.serialNumberBatch)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="p" display="flex" alignItems="center" justifyContent="space-between" margin="0 20px 0 2px" width="100%">
                    <Typography variant="h5">
                        <i>Серійний номер партії:</i> <b style={{ color: "#004267" }}>{batch.serialNumberBatch}</b>
                    </Typography>

                    <Typography variant="h6"><i>Дата:</i> {batch.dateBatchReceipt}</Typography>
                </Typography>
            </AccordionSummary>

            <AccordionDetails >
                <Button variant="contained" color="error" fullWidth onClick={() => deleteProductionBatch(batch.serialNumberBatch)}>
                    Видалити
                </Button>
                <MUIDataTable
                    title={"Список лікарських засобів"}
                    data={batch.medicines.map((medicine) => {
                        return {
                            serialNumberMedicine: medicine.serialNumberMedicine,
                            productionDate: medicine.productionDate,
                            producer: medicine.producer,
                            medicineQuantity: medicine.medicineQuantity,
                            medicineName: medicine.medicineData.medicineName,
                        };
                    })}
                    columns={columns(handleOpenDetailsModal)}
                    options={options}
                />
            </AccordionDetails>
            {selectedMedicine ? (
                <DetailsModal
                    openShowDetailsMedicine={openShowDetailsMedicine}
                    closeShowDetailsMedicine={closeShowDetailsMedicine}
                    medicine={selectedMedicine}
                />) : (
                <>
                </>
            )}
        </Accordion >
    )
};

const DetailsModal = ({ openShowDetailsMedicine, closeShowDetailsMedicine, medicine }) => {

    return (
        <Modal open={openShowDetailsMedicine} onClose={closeShowDetailsMedicine}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                padding: "0 20px"
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    padding: "20px 10px",
                }}>
                    <Typography><i>Назва лікарського засобу:</i> <b>{medicine.medicineName}</b></Typography>
                    <Typography><i>В чому вимірюється:</i> {medicine.unitName}</Typography>
                    <Typography><i>Термін придатності:</i> {medicine.expirationDate}</Typography>
                    <Typography><i>Показання:</i> {medicine.indications}</Typography>
                    <Typography><i>Протипоказання:</i> {medicine.contraindications}</Typography>
                    <Typography><i>Опис:</i> {medicine.description}</Typography>
                    <Typography><i>Інструкція використання:</i> {medicine.instruction}</Typography>
                </Box>
            </Box>
        </Modal>
    );
}

export default BatchAccordion;