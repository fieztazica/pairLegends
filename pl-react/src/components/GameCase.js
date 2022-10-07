import { Box, Button } from "@mui/material";
import { useGame } from "../pages/Game";
import GameMode from "./GameMode";
import GameTimer from "./GameTimer";
import Tiles from "./Tiles";

const GameCase = () => {
  const { timer, status, handleOnIdle } = useGame();
  
  switch (status) {
    case "play":
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
    default:
      return <GameMode />;
  }
};

export default GameCase;
