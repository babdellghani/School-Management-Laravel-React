import PropTypes from "prop-types";
import { Bell, Menu } from "lucide-react";
import UserDropDown from "@/components/UserDropDown";
import { ModeToggle } from "@/components/dark-mode/mode-toggle";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import { useEffect } from "react";
import StudentApi from "@/services/Api/Student/StudentApi";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/router";

function Header({ toggleSidebar }) {
    const {
        user,
        setUser,
        isLoading,
        setIsLoading,
        setAuthenticated,
        authenticated,
        logout,
    } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authenticated) return;
        StudentApi.getUser()
            .then((res) => {
                if (res.status === 200) {
                    setUser(res.data);
                    setAuthenticated(true);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                logout();
                navigate(ROUTES.LOGIN);
            });
    }, []);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden mr-4"
                        onClick={toggleSidebar}
                    >
                        <Menu className="h-6 w-6 dark:text-white" />
                        <span className="sr-only">Open sidebar</span>
                    </Button>
                    {isLoading ? (
                        <Skeleton className="h-10 w-48" />
                    ) : (
                        <h1 className="text-xl font-semibold dark:text-white capitalize">
                            Welcome, {user?.name}
                        </h1>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    <ModeToggle variant="outline" />
                    <Button variant="outline" size="icon">
                        <Bell className="h-5 w-5 dark:text-dark" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                    <UserDropDown />
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
