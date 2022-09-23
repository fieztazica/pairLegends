import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Link as RouterLink, Router } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LinkRouter from '../components/LinkRouter';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function Home() {
    const [openHtpDialog, setOpenHtpDialog] = React.useState(false);

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (openHtpDialog) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openHtpDialog]);

    const HomeTitle = () => (
        <Box m={1}>
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
        </Box>
    )

    const GameButtonGroup = () => (
        <ButtonGroup
            variant="contained"
            orientation="vertical"
            sx={{
                m: 1,
                'a:hover': {
                    color: 'primary.contrastText',
                }

            }}
        >
            <Button to="/game" component={RouterLink} >
                Play Game
            </Button>
            <Button onClick={() => setOpenHtpDialog(true)} component={Link}>
                How to play
            </Button>
            <Button rel="noreferrer" href="https://discord.io/owlvernyte" target="_blank" component={Link}>
                Support
            </Button>
        </ButtonGroup>
    )

    const NavButtonGroup = () => (
        <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            sx={{
                m: 1,
                'a:hover': {
                    color: 'primary.contrastText',
                }
            }}
        >
            <Button href="/fetch-data">
                Fetch Data
            </Button>
            <Button href="/counter" >
                Counter
            </Button>
        </ButtonGroup>
    )

    const HowToPlayDialog = () => (
        <Dialog
            open={openHtpDialog}
            onClose={() => setOpenHtpDialog(false)}
            aria-labelledby="how-to-play-dialog-title"
            aria-describedby="how-to-play-dialog-description"
        >
            <DialogTitle id="how-to-play-dialog-title">How to play</DialogTitle>
            <DialogContent dividers>
                <DialogContentText
                    id="how-to-play-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    Just play like normal pikachu game but with LoL champions not pokemons.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenHtpDialog(false)}>I'm good</Button>
            </DialogActions>
        </Dialog>
    )

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
                    <HomeTitle />
                    <GameButtonGroup />
                    <HowToPlayDialog />
                    <Box m={1}>Nav Zone</Box>
                    <NavButtonGroup />
                </Box>
            </Container>
        </Box>
    );

}
