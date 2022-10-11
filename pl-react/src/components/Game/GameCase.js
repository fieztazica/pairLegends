import { useGame } from "../contexts/GameContext";
import GameMode from "./GameMode";

const GameCase = ({ children }) => {
  const { status } = useGame();
  switch (status) {
    case "idle":
      return <GameMode />;
    default:
      return children;
  }
};

export default GameCase;
