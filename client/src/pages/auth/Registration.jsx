import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Auth from "../../api/requests/auth.request";
import Hospital from "../../api/requests/hospital.request";
import { checkPasswordComplexity } from "../../util/auth";
import { errorToastOptions } from "../../util/toast.options";
import Header from '../../components/Header';
import RegistrationForm from '../../components/auth/RegistrationForm';
import Loader from '../../components/Loader';

const styleBody = {
    display: "flex",
    flexDirection: "column",
    height: "100vh"
};

const styleFormBody = {
    flex: "1",
    margin: "20px auto"
};

const Registration = () => {
    const navigate = useNavigate();
    const [hospitals, setHospitals] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [position, setPosition] = useState("");
    const [hospitalId, setHospitalId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Реєстрація";
        Auth.checkAuth()
            .then(() => navigate("/"))
            .catch(async () => setHospitals((await Hospital.getAllHospitals()).data.hospitals))
            .finally(() => setIsLoading(false));
    }, [navigate]);

    const handleRegistration = (event) => {
        event.preventDefault();
        const passwordComplexity = checkPasswordComplexity(password);

        if (!passwordComplexity.valid) {
            if (toast.isActive("error-toast")) {
                toast.update("error-toast", {
                    render: <div dangerouslySetInnerHTML={{ __html: passwordComplexity.message }} />,
                    ...errorToastOptions,
                });
            } else {
                toast.error(<div dangerouslySetInnerHTML={{ __html: passwordComplexity.message }} />, {
                    toastId: "error-toast",
                    ...errorToastOptions,
                });
            }
            return;
        }

        const registrationData = { username, password, firstName, lastName, position, hospitalId };
        Auth.registration(registrationData)
            .then(({ data }) => {
                navigate("/login");
            })
            .catch((err) => {
                const { message } = err.response.data;
                if (err.response.status === 403) {
                    navigate("/");
                }
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

    if (isLoading) return (<Loader />);

    return (
        <Box sx={styleBody}>
            <Header isAuth={false} />
            <Box component="main" sx={styleFormBody}>
                <RegistrationForm handleRegistration={handleRegistration}
                    hospitals={hospitals}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    setPosition={setPosition}
                    setHospitalId={setHospitalId} hospitalId={hospitalId} />
                <ToastContainer />
            </Box>
        </Box>
    );
};

export default Registration;