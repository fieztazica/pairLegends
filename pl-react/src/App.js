import React from "react";
import AppRoutes from "./AppRoutes";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
/* import './custom.css'; */
import { theme } from "./theme/devias";
import { UserProvider } from "./components/contexts/UserContext";

export default function App() {
  const resTheme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={resTheme}>
      <div className="App">
        <CssBaseline />
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </div>
    </ThemeProvider>
  );
}
