import { Outlet } from "react-router-dom";
import NavBar from "@/components/guset/NvaBar";

function Layout() {
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
