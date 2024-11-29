import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../../Components/Footer/Footer";
import NavBar from "../../../Components/NavBar/NavBar";
import DashBoardSideBar from "../../../Components/DashboardSideBar/DashboardSideBar";

const DashboardLayOut = () => {
    return <>
        <NavBar/>
        <div className="relative">
            <Outlet/>
            <DashBoardSideBar />
        </div>
        <Footer/>
    </>;
};

export default DashboardLayOut;
