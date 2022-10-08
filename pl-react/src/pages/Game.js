import * as React from "react";
// components
import { Container, Box } from "@mui/material";
// hooks
//import { useSnackbar } from "notistack";
import PlayAble from "../components/Game/PlayAble";
import DevStatus from "../components/Game/DevStatus";
import GameCase from "../components/Game/GameCase";
import { GameProvider } from "../components/contexts/GameContext";
import Gameplay from "../components/Game";

export function Game() {
  return (
    <GameProvider>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Container maxWidth="md">
          <Box alignItems="center" display="flex" flexDirection="column">
            <PlayAble>
              <DevStatus />
              <GameCase>
                <Gameplay />
              </GameCase>
            </PlayAble>
          </Box>
        </Container>
      </Box>
    </GameProvider>
  );
}
