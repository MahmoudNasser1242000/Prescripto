import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";

const LayOut = () => {
    return (
        <>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default LayOut;
