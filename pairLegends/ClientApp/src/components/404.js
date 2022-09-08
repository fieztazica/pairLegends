import * as React from "react";
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

export function NotFound() {

    return (
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
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
                        404: The page you are looking for isn’t here
                    </Typography>
                    <Typography
                        align="center"
                        color="secondary"
                        variant="subtitle2"
                    >
                        You either tried some shady route or you came here by mistake.
                        Whichever it is, try using the navigation
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                        <img
                            alt="Under development"
                            src="/static/images/undraw_page_not_found_su7k.svg"
                            style={{
                                marginTop: 50,
                                display: 'inline-block',
                                maxWidth: '100%',
                                width: 560
                            }}
                        />
                    </Box>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button
                            startIcon={(<HomeIcon fontSize="small" />)}
                            sx={{ mt: 3 }}
                            variant="contained"
                        >
                            Home
                        </Button>
                    </Link>


                </Box>
            </Container>
        </Box>
    );
}
