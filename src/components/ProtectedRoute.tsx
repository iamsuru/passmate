import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Cookie } from "../cookies/cookie";
import { isTokenExpired } from "../helpers/token.helper";
import { RoutesUrl } from "../utils/enums";

const cookie = new Cookie();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const userData = cookie.getCookie(process.env.REACT_APP_USER_AUTH_SECRET_KEY!);
    //getting temp cookie
    const userTempData = cookie.getCookie(process.env.REACT_APP_USER_AUTH_TEMP_SECRET_KEY!);

    if (!userData && !userTempData && location.pathname === RoutesUrl.CREATE_PASSMATE_PASSWORD) {
        return <Navigate to={RoutesUrl.HOME_PAGE} replace />;
    }

    // if account is created for new user but no password is setted yet
    if (userTempData && location.pathname !== RoutesUrl.CREATE_PASSMATE_PASSWORD) {
        return <Navigate to={RoutesUrl.CREATE_PASSMATE_PASSWORD} replace />;
    }
    // Checking if the token exists and is valid
    const hasValidToken = userData && userData.token && !isTokenExpired(userData.token);

    // If the user has a valid token
    if (hasValidToken && location.pathname !== RoutesUrl.HOME_SCREEN) {
        return <Navigate to={RoutesUrl.HOME_SCREEN} replace />;
    }

    // If the user don't have a valid token
    if (!hasValidToken && location.pathname === RoutesUrl.HOME_SCREEN) {
        return <Navigate to={RoutesUrl.HOME_PAGE} replace />;
    }

    // Allow access to protected routes if token is valid
    return <>{children}</>;
};

export default ProtectedRoute;
