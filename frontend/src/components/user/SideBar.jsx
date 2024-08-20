import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
    X,
    Home,
    Mail,
    Settings,
    HelpCircle,
    User,
    Calendar,
    FileText,
    Users,
    Briefcase,
    Layout,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES, STUDENT_DASHBOARD_PATH } from "@/router";
import { Link } from "react-router-dom";

function SideBar({ isSidebarOpen, setSidebarOpen, toggleSidebar }) {
    const [isMobile, setIsMobile] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [pathName, setPathName] = useState(window.location.pathname.slice(1));
    
    useEffect(() => {
        setPathName(window.location.pathname.slice(1));
    }, [window.location.pathname]);

    useEffect(() => {
        const checkScreenSize = () => {
            const isLargeScreen = window.innerWidth >= 1024; // lg breakpoint
            setIsMobile(window.innerWidth < 1024);
            setSidebarOpen(window.innerWidth >= 1024);
            setIsExpanded(!isLargeScreen);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    const toggleExpanded = () => setIsExpanded(!isExpanded);
    const handleEnter = () => {
        if (!isMobile) {
            setIsMenuOpen(true);
        }
    };
    const handleLeave = () => {
        if (!isMobile) {
            setIsMenuOpen(false);
        }
    };

    const navItems = [
        { icon: Home, text: "Dashboard", path: STUDENT_DASHBOARD_PATH },
        { icon: Users, text: "Users", path: ROUTES.USERS },
        { icon: Briefcase, text: "Projects" },
        { icon: Calendar, text: "Calendar" },
        { icon: FileText, text: "Documents" },
        { icon: Mail, text: "Messages" },
        { icon: Settings, text: "Settings" },
        { icon: HelpCircle, text: "Help & Support" },
    ];

    return (
        <aside
            className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${isExpanded ? "w-64" : "w-[4.5rem]"}
          fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out
          lg:relative lg:translate-x-0
          lg:hover:w-64
        `}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <div
                className={`flex items-center gap-2 p-4 border-b dark:border-gray-700 ${
                    isMobile || isMenuOpen || isExpanded
                        ? "justify-between"
                        : "justify-center"
                }`}
            >
                <h2
                    className={`text-xl font-semibold flex items-center gap-2 ${
                        isMobile || isMenuOpen || isExpanded
                            ? "justify-between"
                            : "justify-center"
                    }`}
                >
                    <Layout className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span
                        className={`${
                            isMobile || isMenuOpen || isExpanded
                                ? "block"
                                : "w-0"
                        } dark:text-white truncate`}
                    >
                        MyApp
                    </span>
                </h2>
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={toggleSidebar}
                >
                    <X className="h-6 w-6 dark:text-white" />
                    <span className="sr-only">Close sidebar</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className={`hidden ${
                        isMenuOpen || isExpanded ? "lg:flex" : ""
                    }`}
                    onClick={toggleExpanded}
                >
                    {isExpanded ? (
                        <ChevronLeft className="h-5 w-5 dark:text-white" />
                    ) : (
                        <ChevronRight className="h-5 w-5 dark:text-white" />
                    )}
                    <span className="sr-only">
                        {isExpanded ? "Collapse sidebar" : "Expand sidebar"}
                    </span>
                </Button>
            </div>
            <nav className="p-4">
                <ul className="space-y-2">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.path}
                                className={`flex items-center p-2 rounded-lg transition-colors duration-150 ${
                                    pathName === item.text.toLowerCase()
                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                } ${
                                    isMobile || isMenuOpen || isExpanded
                                        ? "justify-start gap-2"
                                        : "justify-center"
                                }`}
                            >
                                <item.icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                <span
                                    className={`truncate ${
                                        isMobile || isMenuOpen || isExpanded
                                            ? "block"
                                            : "w-0"
                                    }`}
                                >
                                    {item.text}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="absolute bottom-0 w-full p-4 border-t dark:border-gray-700">
                <a
                    href="#"
                    className={`flex items-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 ${
                        isMobile || isMenuOpen || isExpanded
                            ? "justify-start gap-2"
                            : "justify-center"
                    }`}
                >
                    <User className="w-5 h-5" />
                    <span
                        className={
                            isMobile || isMenuOpen || isExpanded
                                ? "block"
                                : "hidden"
                        }
                    >
                        Profile
                    </span>
                </a>
            </div>
        </aside>
    );
}

SideBar.propTypes = {
    setSidebarOpen: PropTypes.func,
    isSidebarOpen: PropTypes.bool,
    toggleSidebar: PropTypes.func,
};

export default SideBar;
