import { Box, Button } from "@mui/material";
import * as React from "react";
import { useGame } from "../contexts/GameContext";
import GameTimer from "./GameTimer";
import Tiles from "./Tiles";

export default function Gameplay() {
  const {
    timer,
    handleOnIdle,
    componentDidUpdate,
    componentDidMount,
    champ1,
    champ2,
  } = useGame();

  React.useEffect(componentDidMount, []);

  React.useEffect(componentDidUpdate, [champ1, champ2]);

  return (
    <Box sx={{ width: "100%" }}>
      <Button variant="contained" onClick={() => handleOnIdle()}>
        Idle
      </Button>
      {timer && <GameTimer />}
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Tiles />
      </Box>
    </Box>
  );
}
