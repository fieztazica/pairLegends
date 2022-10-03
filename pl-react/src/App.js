import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Layout } from "./components/layouts/Layout";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
/* import './custom.css'; */
import { theme } from "./theme/devias";
import { Helmet } from "react-helmet";
import { SnackbarProvider } from "notistack";
import SnackbarAction from "./components/SnackbarAction";
import { UserProvider } from "./components/contexts/UserContext";
import HelmetElement from "./components/routes/HelmetElement";
import PrivateRoute from "./components/routes/PrivateRoute";
import GuestRoute from "./components/routes/GuestRoute";

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
