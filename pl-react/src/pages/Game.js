import * as React from "react";
import { Container, Box } from "@mui/material";
import PlayAble from "../components/Game/PlayAble";
import DevStatus from "../components/Game/DevStatus";
import GameCase from "../components/Game/GameCase";
import { GameProvider } from "../components/contexts/GameContext";
import Gameplay from "../components/Game/Gameplay";
import EndDialog from "../components/Game/EndDialog";

export function Game() {
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
