import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { ROUTES } from "@/router";
import SideBar from "@/components/user/SideBar";
import Header from "@/components/user/Header";

function Layout() {
    const navigate = useNavigate();
    const context = useUserContext();

    useEffect(() => {
        if (!context.authenticated) {
            navigate(ROUTES.LOGIN);
        }
    }, [context.authenticated]);

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className={`flex h-screen`}>
            {/* Sidebar */}
            <SideBar
                isSidebarOpen={isSidebarOpen}
                setSidebarOpen={setSidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900">
                {/* Header */}
                <Header toggleSidebar={toggleSidebar} />
                {/* Main content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;
