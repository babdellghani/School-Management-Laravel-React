import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "@/components/guset/NvaBar";
import { useUserContext } from "@/context/UserContext";
import { useEffect } from "react";
import { STUDENT_DASHBOARD_PATH } from "@/router";

function Layout() {
    const navigate = useNavigate();
    const context = useUserContext();

    useEffect(() => {
        if (context.authenticated) {
            navigate(STUDENT_DASHBOARD_PATH);
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

export default Layout;
