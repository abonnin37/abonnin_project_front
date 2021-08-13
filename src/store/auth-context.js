import React, {createContext, useCallback, useEffect, useState} from "react";

let logoutTimer;

const AuthContext = createContext({
    token: '',
    isLoggedIn: false,
    isAdmin: false,
    login: (token) => {},
    logout: () => {}
});

const calculateRemainingTime = (expirationTimeMillisecond) => {
    const currentTimeMillisecond = new Date().getTime();

    return expirationTimeMillisecond - currentTimeMillisecond;
}

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationTime = localStorage.getItem('expirationTime');
    const storedRoles = JSON.parse(localStorage.getItem('roles'));


    const remainingTime = calculateRemainingTime(storedExpirationTime);

    if (remainingTime <= 3600) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime,
        roles: storedRoles
    }
}

export const AuthContextProvider = ({children}) => {
    const tokenData = retrieveStoredToken();
    const initialToken = tokenData && tokenData.token;
    const initialRoles = tokenData ? tokenData.roles : [];
    const [token, setToken] = useState(initialToken);
    const [roles, setRoles] = useState(initialRoles);

    const userIsLoggedIn = !!token;
    const userIsAdmin = roles.includes("ROLE_ADMIN");



    const logoutHandler = useCallback(() => {
        setToken(null);
        setRoles([]);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('roles');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }

        return true;
    }, []);

    const logginHandler = (token, expirationTime, roles) => {
        setToken(token);
        setRoles(roles);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('roles', JSON.stringify(roles));

        const remainingTime = calculateRemainingTime(expirationTime);

        // if the remainingTime <= 0 we deconnect the user
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    }

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        isAdmin: userIsAdmin,
        login: logginHandler,
        logout: logoutHandler,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;