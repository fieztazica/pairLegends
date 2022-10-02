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
import { useUser } from "./components/contexts/UserContext";

export default function App() {
  const resTheme = responsiveFontSizes(theme);
  const { user } = useUser();

  return (
    <ThemeProvider theme={resTheme}>
      <div className="App">
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            {AppRoutes.map((route, index) => {
              const { element, name, lock, ...rest } = route;

              return (
                <Route
                  key={index}
                  {...rest}
                  element={
                    name ? (
                      user && lock ? (
                        <Navigate to="/" replace />
                      ) : (
                        <>
                          <Helmet>
                            <meta charSet="utf-8" />
                            <title>Pair Legends | {name}</title>
                          </Helmet>
                          <SnackbarProvider
                            maxSnack={3}
                            action={(key) => SnackbarAction(key)}
                          >
                            {element}
                          </SnackbarProvider>
                        </>
                      )
                    ) : (
                      element
                    )
                  }
                />
              );
            })}
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}
