import PropTypes from "prop-types";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/dark-mode/theme-provider";

export function ModeToggle({ variant = "outline", size = "icon" }) {
    const { setTheme } = useTheme();

    return (
        <Button variant={variant} size={size} onClick={setTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}

ModeToggle.propTypes = {
    size: PropTypes.string,
    variant: PropTypes.string,
};
