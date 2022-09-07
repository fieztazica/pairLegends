import React from 'react';
import { Container } from 'reactstrap';
import { CssBaseline, Box } from "@mui/material";
import { Outlet } from "react-router";
import ResponsiveAppBar from './AppBar';

export function Layout() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <CssBaseline />
            <ResponsiveAppBar />
            <main>
                <Box sx={{ pt: 2, pb: 2 }}>
                    <Container maxWidth="sm">
                        <Outlet />
                    </Container>
                </Box>
            </main>
        </Box>
    );

}
