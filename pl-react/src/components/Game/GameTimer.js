import { Box } from "@mui/material";
import * as React from "react";
import { useGame } from "../contexts/GameContext";
import LinearProgressWithLabel from "../LinearProgressWithLabel";

export default function GameTimer() {
  const { seconds, minutes, duration } = useGame();

  const getNumber = (value) => {
    const leftDigit = value >= 10 ? value.toString()[0] : "0";
    const rightDigit = value >= 10 ? value.toString()[1] : value.toString();
    return {
      leftDigit,
      rightDigit,
    };
  };

  const fMinutes = getNumber(minutes);
  const fSeconds = getNumber(seconds);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel
        value={100 - ((minutes * 60 + seconds) / (duration / 1000)) * 100}
        label={`${fMinutes.leftDigit}${fMinutes.rightDigit}:${fSeconds.leftDigit}${fSeconds.rightDigit}`}
      />
    </Box>
  );
}
