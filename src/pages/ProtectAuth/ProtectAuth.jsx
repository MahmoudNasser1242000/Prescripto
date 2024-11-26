import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectAuth = ({children}) => {
    // const { token } = useSelector((state) => state.auth);

    if (localStorage.getItem("Token")) {
        return <Navigate to={"/"}/>
    } else {
        return children
    }
};

export default ProtectAuth;
