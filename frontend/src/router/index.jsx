import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import UserLayout from "../layouts/UserLayout";
import GustLayout from "../layouts/GustLayout";
import Users from "../pages/Users";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";

export const STUDENT_DASHBOARD_PATH = "/dashboard";

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
        element: <GustLayout />,
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
                path: STUDENT_DASHBOARD_PATH,
                element: <Dashboard />,
            },
            {
                path: ROUTES.USERS,
                element: <Users />,
            },
        ],
    },
]);
