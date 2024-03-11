import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "@/components/pages/home/NavBar";
import { useUserContext } from "@/context/UserContext";
import { useEffect } from "react";
import { DASHBOARD_PATH } from "@/router";

function AuthLayout() {
    const navigate = useNavigate();
    const context = useUserContext();

    useEffect(() => {
        if (context.authenticated) {
            navigate(DASHBOARD_PATH);
        }
    }, [context.authenticated]);

    return (
        <>
            <header>
                <NavBar />
            </header>
            <main className="container mx-auto my-5">
                <Outlet />
            </main>
            <footer>Footer</footer>
        </>
    );
}

export default AuthLayout;
