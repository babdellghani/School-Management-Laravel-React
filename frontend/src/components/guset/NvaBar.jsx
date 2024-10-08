import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Link, useNavigate} from "react-router-dom";
import { ModeToggle } from "@/components/dark-mode/mode-toggle.jsx";
import { ROUTES } from "@/router/index.jsx";
import { useUserContext } from "@/context/UserContext.jsx";
import StudentApi from "@/services/Api/Student/StudentApi.js";
import UserDropDown from "@/components/UserDropDown.jsx";

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { user, setUser, setIsLoading, setAuthenticated, authenticated, logout } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authenticated) return;
        StudentApi.getUser().then((res) => {
            if (res.status === 200) {
                setUser(res.data);
                setAuthenticated(true);
                setIsLoading(false);
            }
        }).catch(() => {
            logout();
            navigate(ROUTES.LOGIN);
        });
    }, []);

    useEffect(() => setMounted(true), []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: "Home", href: ROUTES.HOME },
        { name: "Users", href: "/users" },
    ];

    return (
        <nav className="bg-background shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="h-8 w-auto"
                                src="/placeholder.svg?height=32&width=32"
                                alt="Logo"
                            />
                        </div>
                    </div>

                    {/* Center links - visible on medium screens and larger */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-foreground hover:text-foreground/80 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {mounted && <ModeToggle />}

                        {authenticated && (
                            <>
                                <UserDropDown />
                            </>
                        )}

                        {!authenticated && (
                            <>
                                <Link to="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button>Register</Button>
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-foreground/60 hover:text-foreground hover:bg-background focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-foreground hover:text-foreground/80 block px-3 py-2 rounded-md text-base font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex flex-row-reverse items-center justify-between">
                            {mounted && <ModeToggle className="mr-10" />}

                            {authenticated && (
                                <div className="flex items-center space-x-4 px-3 py-2">
                                    <Avatar>
                                        <AvatarImage
                                            src="/placeholder.svg?height=32&width=32"
                                            alt="User"
                                        />
                                        <AvatarFallback>
                                            <User />
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-foreground capitalize">
                                        {user.name}
                                    </span>
                                </div>
                            )}

                            {!authenticated && (
                                <>
                                    <div className="flex items-center space-x-4 px-3 py-2">
                                        <Link to="/login">
                                            <Button variant="outline">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link to="/register">
                                            <Button>Register</Button>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavBar;
