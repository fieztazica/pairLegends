import { Box, Typography } from "@mui/material";
import * as React from "react";
import { useGame } from "../contexts/GameContext";

const Score = () => {
    const { getScore } = useGame();

    return (<Box>
        <Typography align="center">
            {getScore()}
        </Typography>
    </Box>);
}

export default Score