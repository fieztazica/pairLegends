import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/layouts/Layout';
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme, createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import './custom.css';
import { deepmerge } from '@mui/utils';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ColorModeContext } from './config/color-context';
import { getDesignTokens, getThemedComponents } from './theme/Theme';

export default function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = React.useState();
    const themeKey = 'pairLegendsTheme'
    
    React.useEffect(() => {
        let currentTheme = localStorage.getItem(themeKey)
        if (!currentTheme) {
            currentTheme = prefersDarkMode ? 'dark' : 'light'
            localStorage.setItem(themeKey, currentTheme)
        }
        setMode(currentTheme);
    }, [prefersDarkMode]);

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                let currentTheme = localStorage.getItem(themeKey)
                if (!currentTheme) currentTheme = prefersDarkMode ? 'dark' : 'light'
                currentTheme = currentTheme === "light" ? "dark" : "light"
                localStorage.setItem(themeKey, currentTheme)
                setMode(currentTheme);
            },
        }),
        []
    );

    let theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <CssBaseline />
                    <Routes>
                        <Route element={<Layout />}>
                            {AppRoutes.map((route, index) => {
                                const { element, ...rest } = route;
                                return <Route key={index} {...rest} element={element} />;
                            })}
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
