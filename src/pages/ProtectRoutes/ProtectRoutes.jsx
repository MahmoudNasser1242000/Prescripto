import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoutes = ({children}) => {
    const { token } = useSelector((state) => state.auth);
    if (token) {
        return children
    } else {
        return <Navigate to={"/auth/login"}/>
    }
};

export default ProtectRoutes;
