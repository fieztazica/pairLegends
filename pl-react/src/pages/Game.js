import * as React from "react";
// components
import { Container, Box } from "@mui/material";
// hooks
//import { useSnackbar } from "notistack";
import PlayAble from "../components/Game/PlayAble";
import DevStatus from "../components/Game/DevStatus";
import GameCase from "../components/Game/GameCase";
import { GameProvider } from "../components/contexts/GameContext";
import Gameplay from "../components/Game/Gameplay";
import EndDialog from "../components/Game/EndDialog";
import { useSnackbar } from "notistack";
import { postMatch } from "../utils/api";
import { useUser } from "../components/contexts/UserContext";

export function Game() {

    const { enqueueSnackbar } = useSnackbar();
    const { user } = useUser();

    const SnackBar =
        (message, variant, ...props) =>
            () => {
                enqueueSnackbar(message, {
                    variant,
                    ...props,
                });
            };

    React.useEffect(() => {
        if (user && localStorage.getItem("lastGame")) {
            let lastGame = { ...(JSON.parse(localStorage.getItem("lastGame"))) }
            lastGame.id = user?.id
            SnackBar(`Found a game in your local storage!`, "info")();
            postMatch(JSON.stringify(lastGame))
                .then((data) => {
                    localStorage.removeItem("lastGame");
                    SnackBar(`Saved your last game to cloud!`, "success")();
                })
                .catch((err) => {
                    SnackBar(`${err.message}`, "error")();
                    console.error(err.message);
                });
        }
    }, [])

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Container maxWidth="md">
                <Box alignItems="center" display="flex" flexDirection="column">
                    <PlayAble>
                        <GameProvider>
                            {!(
                                process.env.REACT_APP_VERCEL_ENV === "production" ||
                                process.env.NODE_ENV === "production"
                            ) && <DevStatus />}
                            <GameCase>
                                <Gameplay />
                                <EndDialog />
                            </GameCase>
                        </GameProvider>
                    </PlayAble>
                </Box>
            </Container>
        </Box>
    );
}
