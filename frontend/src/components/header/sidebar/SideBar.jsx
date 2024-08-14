"use client";

import { useState, useEffect } from "react";
import {
    Menu,
    X,
    Home,
    Mail,
    Settings,
    HelpCircle,
    User,
    Bell,
    Calendar,
    FileText,
    BarChart2,
    Users,
    Briefcase,
    Search,
    Layout,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SideBar() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        const checkScreenSize = () => {
            const isLargeScreen = window.innerWidth >= 1024; // lg breakpoint
            setIsMobile(window.innerWidth < 768);
            setSidebarOpen(window.innerWidth >= 768);
            setIsExpanded(!isLargeScreen);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const toggleExpanded = () => setIsExpanded(!isExpanded);

    const navItems = [
        { icon: Home, text: "Dashboard" },
        { icon: BarChart2, text: "Analytics" },
        { icon: Users, text: "Team" },
        { icon: Briefcase, text: "Projects" },
        { icon: Calendar, text: "Calendar" },
        { icon: FileText, text: "Documents" },
        { icon: Mail, text: "Messages" },
        { icon: Settings, text: "Settings" },
        { icon: HelpCircle, text: "Help & Support" },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${isExpanded ? "w-64" : "w-16"}
          fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform transition-all duration-300 ease-in-out
          md:relative md:translate-x-0
          lg:hover:w-64
        `}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2
                        className={`text-xl font-semibold flex items-center ${
                            isExpanded ? "" : "lg:hidden"
                        }`}
                    >
                        <Layout className="h-6 w-6 mr-2 text-blue-600" />
                        <span className={isExpanded ? "" : "lg:hidden"}>
                            MyApp
                        </span>
                    </h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={toggleSidebar}
                    >
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close sidebar</span>
                    </Button>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <a
                                    href="#"
                                    className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-150"
                                >
                                    <item.icon className="w-5 h-5 mr-3 text-gray-500" />
                                    <span
                                        className={
                                            isExpanded ? "" : "lg:hidden"
                                        }
                                    >
                                        {item.text}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t">
                    <a
                        href="#"
                        className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-150"
                    >
                        <User className="w-5 h-5 mr-3" />
                        <span className={isExpanded ? "" : "lg:hidden"}>
                            Profile
                        </span>
                    </a>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden mr-4"
                                onClick={toggleSidebar}
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open sidebar</span>
                            </Button>
                            <h1 className="text-xl font-semibold">
                                Welcome, User
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hidden lg:flex"
                                onClick={toggleExpanded}
                            >
                                {isExpanded ? (
                                    <ChevronLeft className="h-5 w-5" />
                                ) : (
                                    <ChevronRight className="h-5 w-5" />
                                )}
                                <span className="sr-only">
                                    {isExpanded
                                        ? "Collapse sidebar"
                                        : "Expand sidebar"}
                                </span>
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5" />
                                <span className="sr-only">Notifications</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                                <span className="sr-only">User menu</span>
                            </Button>
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-semibold mb-4">
                            Dashboard Overview
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Total Users",
                                    value: "1,234",
                                    icon: Users,
                                },
                                {
                                    title: "Active Projects",
                                    value: "42",
                                    icon: Briefcase,
                                },
                                { title: "Messages", value: "15", icon: Mail },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow p-6 flex items-center"
                                >
                                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                                        <item.icon className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {item.title}
                                        </h3>
                                        <p className="text-2xl font-bold">
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
