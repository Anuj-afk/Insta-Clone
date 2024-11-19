import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";

const ProtectedRoute = ({ children }) => {
    const { userAuth: {accessToken} } = useContext(UserContext);

    return accessToken ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
