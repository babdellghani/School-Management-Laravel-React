import { Outlet } from "react-router-dom";
import NavBar from "../components/header/nvabar/NvaBar.jsx";
import SideBar from "../components/header/sidebar/SideBar.jsx";

function Layout() {
    return (
        <>
            <header>
                <SideBar />
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
