import React from 'react';
import { CssBaseline, Box } from "@mui/material";
import { Outlet } from "react-router";
import ResponsiveAppBar from './AppBar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
    Link as RouterLink,
    Route,
    Routes,
    MemoryRouter,
    useLocation,
} from 'react-router-dom';
import AppRoutes from '../../AppRoutes';

const breadcrumbNameMap = {}
AppRoutes.filter(route => !route.index).forEach((route) => breadcrumbNameMap[route.path] = route.name)

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

export function Layout() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "80vh",
            }}
        >
            <CssBaseline />
            <ResponsiveAppBar />
            <main>
                <Box sx={{ pt: 2, pb: 2 }}>
                    <Container>
                        <Breadcrumbs aria-label="breadcrumb">
                            <LinkRouter underline="hover" color="inherit" to="/">
                                Home
                            </LinkRouter>
                            {pathnames.map((value, index) => {
                                const last = index === pathnames.length - 1;
                                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                                return last ? (
                                    <Typography color="text.primary" key={to}>
                                        {breadcrumbNameMap[to]}
                                    </Typography>
                                ) : (
                                    <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                                        {breadcrumbNameMap[to]}
                                    </LinkRouter>
                                );
                            })}
                        </Breadcrumbs>
                        <Outlet />
                    </Container>
                </Box>
            </main>
        </Box>
    );

}
