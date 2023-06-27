import React, {useEffect, useState} from 'react';
import {AppBar, Box, Button, Link, TextField, Toolbar, Typography} from "@mui/material";

const styleBody = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
};

const styleForm = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "500px",
    padding: "20px 10px",
    borderRadius: "10px",
};


const Registration = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const registration = (event) => {
        event.preventDefault();
        console.log(username, password);
    };

    useEffect(() => {
        document.title = "Реєстрація";
    }, []);

    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h5"> Облік лікарських засобів військового шпиталю</Typography>
                </Toolbar>
            </AppBar>
            <Box sx={styleBody}>
                <Box sx={styleForm} component="form" onSubmit={registration}>
                    <Toolbar sx={{margin: "auto", fontSize: "40px"}} component="h1">
                        Реєстрація
                    </Toolbar>
                    <TextField name="username"
                               type="text"
                               label="Username"
                               variant="outlined"
                               required={true}
                               autoFocus={true}
                               onChange={(e) => setUsername(e.target.value)}/>
                    <TextField name="password"
                               type="password"
                               label="Password"
                               variant="outlined"
                               required={true}
                               onChange={(e) => setPassword(e.target.value)}/>
                    <Button variant="contained"
                            color="primary"
                            type="submit">
                        Зареєструватися
                    </Button>
                    <Link href="/Login">
                        Війти
                    </Link>
                </Box>
            </Box>
        </>

    );
};

export default Registration;