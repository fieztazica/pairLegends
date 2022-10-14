import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import HowToPlayDialog from "../components/Home/HowToPlayDialog";
import HomeTitle from "../components/Home/HomeTitle";
import HomeMenu from "../components/Home/HomeMenu";

export function Home() {
    const [openHtpDialog, setOpenHtpDialog] = React.useState(false);

    return (
        <Box
            component="main"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        minWidth="60%"
                        sx={{
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <HomeTitle />
                        <HomeMenu htpButtonOnClick={() => setOpenHtpDialog(true)} />
                    </Box>
                    <HowToPlayDialog
                        openState={openHtpDialog}
                        onClose={() => setOpenHtpDialog(false)}
                    />
                </Box>
            </Container>
        </Box>
    );
}
