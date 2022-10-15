import { Box, Typography } from "@mui/material";
import * as React from "react";
import { useGame } from "../contexts/GameContext";
import { makeScore } from "../../utils/index";

const Score = () => {
    const {
        colNum,
        champs,
        seconds,
        minutes,
        tilesDone
    } = useGame();

    const score = () => makeScore(tilesDone, (8 * colNum), champs, (60 * minutes + seconds)) || 0;

    return (
        <Box>
            <Typography variant="button" display="block" align="center">
                Score: {`${score()}`}
            </Typography>
        </Box>
    );
}

export default Score