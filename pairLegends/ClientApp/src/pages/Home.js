import React, { Component } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link as RouterLink, Router } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '80vh'
                }}
            >
                <Container maxWidth="md">
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography
                            align="center"
                            color="primary"
                            variant="h1"
                        >
                            HOME
                        </Typography>
                        <Typography
                            align="center"
                            color="secondary"
                            variant="subtitle2"
                        >
                            Make Pikachu great again.
                        </Typography>
                        <RouterLink to="/game" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" sx={{ mt: 3 }}>
                                Play Game
                            </Button>
                        </RouterLink>

                    </Box>
                </Container>
            </Box>

        );
    }
}
