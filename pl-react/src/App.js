import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/layouts/Layout';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
/*import './custom.css';*/
import { theme } from './theme/devias'
import { Helmet } from "react-helmet";
import { SnackbarProvider } from 'notistack';
import SnackbarAction from './components/SnackbarAction'

export default function App() {
    let resTheme = responsiveFontSizes(theme);

    return (
        <ThemeProvider theme={resTheme}>
            <div className="App">
                <CssBaseline />
                <Routes>
                    <Route element={<Layout />}>
                        {AppRoutes.map((route, index) => {
                            const { element, name, ...rest } = route;
                            return (< Route key={index} {...rest} element={
                                name ? (<>
                                    <Helmet>
                                        <meta charSet="utf-8" />
                                        <title>Pair Legends | {name}</title>
                                    </Helmet>
                                    <SnackbarProvider maxSnack={3} action={(key) => SnackbarAction(key)} >
                                        {element}
                                    </SnackbarProvider>
                                </>) : element
                            }
                            />);
                        })}
                    </Route>
                </Routes>
            </div>
        </ThemeProvider>
    );
}