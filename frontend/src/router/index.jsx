import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts/Layout";
import UserLayout from "@/layouts/UserLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Users from "@/pages/Users";
import Register from "@/pages/auth/Register";
import Login from "@/pages/auth/Login";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";

export const DASHBOARD_PATH = "/dashboard";

export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    USERS: "/users",
    NOT_FOUND: "*",
};

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: ROUTES.HOME,
                element: <Home />,
            },
            {
                path: ROUTES.NOT_FOUND,
                element: <NotFound />,
            },
        ],
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: ROUTES.REGISTER,
                element: <Register />,
            },
            {
                path: ROUTES.LOGIN,
                element: <Login />,
            },
        ],
    },
    {
        element: <UserLayout />,
        children: [
            {
                path: DASHBOARD_PATH,
                element: <Dashboard />,
            },
            {
                path: ROUTES.USERS,
                element: <Users />,
            },
        ],
    },
]);
