import { Box } from "@mui/material";
import * as React from "react";
import { useGame } from "../pages/Game";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

export default function GameTimer() {
  const {
    seconds,
    minutes,
    duration,
  } = useGame();
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel
        value={100 - ((minutes * 60 + seconds) / (duration / 1000)) * 100}
        label={`${minutes}:${seconds}`}
      />
    </Box>
  );
}
