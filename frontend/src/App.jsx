import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import { ThemeProvider } from "@/components/dark-mode/theme-provider";
import UserContext from "./context/UserContext";

function App() {
    return (
        <>
            <UserContext>
                <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                    <RouterProvider router={router} />
                </ThemeProvider>
            </UserContext>
        </>
    );
}

export default App;
