import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import AuthApi from "@/services/api/auth/AuthApi";

export const UserStateContext = createContext({
    user: {},
    setUser: () => {},
    isLoading: true,
    authenticated: false,
    setAuthenticated: () => {},
    login: () => {},
    logout: () => {},
});
function UserContext({ children }) {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authenticated, _setAuthenticated] = useState(window.localStorage.getItem("authenticated"));

    const login = async (email, password) => {
        await AuthApi.getCsrfToken();
        return await AuthApi.login(email, password)
    };

    const logout = async () => {
        setUser({});
        _setAuthenticated(false);
        window.localStorage.removeItem("authenticated");
        await AuthApi.logout();
    };

    const setAuthenticated = (value) => {
        _setAuthenticated(value);
        window.localStorage.setItem("authenticated", value);
    };

    return (
        <UserStateContext.Provider
            value={{
                user,
                setUser,
                isLoading,
                setIsLoading,
                authenticated,
                setAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </UserStateContext.Provider>
    );
}

UserContext.propTypes = {
    children: PropTypes.any,
};

export default UserContext;

export const useUserContext = () => useContext(UserStateContext);
