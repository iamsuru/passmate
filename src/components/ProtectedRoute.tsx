import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Cookie } from "../cookies/cookie";
import { isTokenExpired } from "../helpers/token.helper";

const cookie = new Cookie();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const userData = cookie.getCookie(process.env.REACT_APP_USER_AUTH_SECRET_KEY!);
    // Checking if the token exists and is valid
    const hasValidToken = userData && userData.token && !isTokenExpired(userData.token);

    // If the user has a valid token
    if (hasValidToken && location.pathname !== "/home-screen") {
        return <Navigate to="/home-screen" replace />;
    }

    // If the user don't have a valid token
    if (!hasValidToken && location.pathname === "/home-screen") {
        return <Navigate to="/" replace />;
    }

    // Allow access to protected routes if token is valid
    return <>{children}</>;
};

export default ProtectedRoute;
