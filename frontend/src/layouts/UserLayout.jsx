import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/header/nvabar/NvaBar.jsx";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";
import { ROUTES } from "../router";

function Layout() {
    const navigate = useNavigate();
    const context = useUserContext();

    useEffect(() => {
        if (!context.authenticated) {
            navigate(ROUTES.LOGIN);
        }
    }, [context.authenticated]);
    return (
        <>
            <header>
                <NavBar />
            </header>
            <main className="container mx-auto my-5 min-h-screen">
                <Outlet />
            </main>
            <footer>Footer</footer>
        </>
    );
}

export default Layout;
