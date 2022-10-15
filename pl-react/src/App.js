import React from "react";
import AppRoutes from "./AppRoutes";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
/* import './custom.css'; */
import { theme } from "./theme/devias";
import { UserProvider } from "./components/contexts/UserContext";
import SnackbarAction from "./components/SnackbarAction";
import { SnackbarProvider } from "notistack";

export default function App() {
    const resTheme = responsiveFontSizes(theme);

    return (
        <ThemeProvider theme={resTheme}>
            <div className="App">
                <CssBaseline />
                <SnackbarProvider maxSnack={3} action={(key) => SnackbarAction(key)}>
                    <UserProvider>
                        <AppRoutes />
                    </UserProvider>
                </SnackbarProvider>
            </div>
        </ThemeProvider>
    );
}
