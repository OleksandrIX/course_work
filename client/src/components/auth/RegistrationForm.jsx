import React, { useState } from "react";
import { Box, Typography, TextField, Button, Link, IconButton, InputAdornment } from "@mui/material";
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

const RegistrationForm = ({ handleRegistration, setUsername, setPassword }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => setShowPassword(prev => !prev);

    return (
        <Box sx={styleForm} component="form" onSubmit={handleRegistration}>
            <Typography sx={{ margin: "auto", fontSize: "40px", fontWeight: "bold" }} component="h1">Реєстрація</Typography>

            <TextField name="username"
                type="text"
                label="Username"
                variant="outlined"
                required={true}
                autoFocus={true}
                onChange={(e) => setUsername(e.target.value)} />

            <TextField name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
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