import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("auth")) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div>
            Home
        </div>
    );
};

export default Home;