import * as React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./champion.css";
import { getChampName } from "../../utils/index";
import { useGame } from "../contexts/GameContext";

const GameButton = styled(Button)({
  padding: "1px 0px",
  height: "63px",
  borderRadius: 0,
  transition: "0.5s",
  "&:hover": {
    img: {
      opacity: "0.5",
    },
  },
});

const Champion = ({ value, onClick, selected = false }) => {
  const { fromChamps } = useGame();
  const from = fromChamps || require("../../utils/champions.json");
  return (
    <GameButton
      // style={selected ? { border: "2px solid #D14343" } : null}
      onClick={onClick}
      alt={value === 0 ? "barrier" : `${getChampName(value, from)}`}
      disabled={value === 0}
    >
      <img
        src={
          value === 0 ? "" : `/static/images/${getChampName(value, from)}.png`
        }
        width={60}
        height={60}
        style={
          value === 0
            ? { display: "none" }
            : selected
            ? { border: "6px solid #FFB020" }
            : null
        }
        alt={value === 0 ? "barrier" : `${getChampName(value, from)}`}
        title={value === 0 ? "barrier" : `${from[value]}`}
      />
    </GameButton>
  );
};

export default Champion;
