import React, { useState } from "react";
import { Box, Typography, TextField, Button, Link, IconButton, InputAdornment, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const styleForm = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "500px",
    padding: "20px 10px",
    borderRadius: "10px",
};

const RegistrationForm = ({ handleRegistration,
    hospitals,
    setUsername,
    setPassword,
    setFirstName,
    setLastName,
    setPosition,
    setHospitalId, hospitalId }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClick = () => setShowPassword(prev => !prev);

    return (
        <Box sx={styleForm} component="form" onSubmit={handleRegistration}>
            <Typography sx={{ margin: "auto", fontSize: "40px", fontWeight: "bold" }} component="h1">Реєстрація</Typography>

            <TextField type="text"
                label="Username"
                variant="outlined"
                required={true}
                autoFocus={true}
                onChange={(e) => setUsername(e.target.value)} />

            <TextField name="password" type={showPassword ? "text" : "password"}
                label="Пароль"
                variant="outlined"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton onClick={handleClick} edge="end">
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <TextField type="text"
                    label="Ім'я"
                    variant="outlined"
                    required={true}
                    onChange={(e) => setFirstName(e.target.value)} />

                <TextField type="text"
                    label="Прізвище"
                    variant="outlined"
                    required={true}
                    onChange={(e) => setLastName(e.target.value)} />
            </Box>
            <TextField type="text"
                label="Посада"
                variant="outlined"
                required={true}
                onChange={(e) => setPosition(e.target.value)} />

            <FormControl>
                <InputLabel id="hospital-select-label">Шпиталь</InputLabel>
                <Select label="Шпиталь" required
                    labelId="hospital-select-label"
                    value={hospitalId}
                    onChange={(e) => setHospitalId(e.target.value)}>
                    {hospitals.map((hospital, index) =>
                        <MenuItem key={index} value={hospital.idHospital}>{hospital.nameHospital}</MenuItem>)}
                </Select>
            </FormControl>

            <Button sx={{ fontWeight: "bold", fontSize: "24px" }}
                variant="contained"
                color="primary"
                type="submit">
                Зареєструватися
            </Button>

            <Link sx={{ fontSize: "20px" }} href="/login">Війти</Link>
        </Box>
    );
}

export default RegistrationForm;