import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { STUDENT_DASHBOARD_PATH } from "../../../router/index.jsx";
import { useUserContext } from "../../../context/UserContext.jsx";

function NavBarDropDown() {
    const { user, isLoading, logout } = useUserContext();
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex items-center justify-between gap-2"
                    >
                        {isLoading ? (
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-6 w-6 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-[80px]" />
                                </div>
                            </div>
                        ) : (
                            <>
                                <Avatar className="w-6 h-6">
                                    <AvatarImage
                                        src="/placeholder.svg?height=22&width=22"
                                        alt="User"
                                    />
                                    <AvatarFallback>
                                        <User className="w-5 h-5" />
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-foreground capitalize">
                                    {user.name}
                                </span>
                            </>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link to={STUDENT_DASHBOARD_PATH}>Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={logout}
                        className="cursor-pointer"
                    >
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default NavBarDropDown;
