import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
    useEffect(() => {
        document.title = "404 - Not Found";
    }, []);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
        }}>
            <Typography variant="h1" gutterBottom sx={{ color: "indianred", fontSize: "200px" }}>404</Typography>
            <Typography variant="h2" gutterBottom style={{ textTransform: 'uppercase' }}>
                Сторінку не знайдено
            </Typography>
            <Typography variant="h5" gutterBottom>
                Вибачте, але сторінку, яку ви шукаєте, не знайдено.
            </Typography>
            <Typography variant="p" gutterBottom>
                Можливо, ви перейшли за неправильним посиланням або сторінка була видалена.
            </Typography>
            <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}>
                Повернутися на головну сторінку
            </Button>
        </Box>
    );
};

export default NotFound;
