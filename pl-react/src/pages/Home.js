import React, { Component } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link as RouterLink, Router } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <Box
                component="main"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="50vh"
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
                        <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{
                            mt: 3,
                            'a:hover': {
                                color: 'primary.contrastText',
                            }
                        }}>
                            <Button href="/game">
                                Play Game
                            </Button>
                            <Button href="/fetch-data">
                                Fetch Data
                            </Button>
                            <Button href="/counter" >
                                Counter
                            </Button>
                        </ButtonGroup>
                    </Box>
                </Container>
            </Box>

        );
    }
}
