import { useGame } from "../contexts/GameContext";
import GameMode from "./GameMode";

const GameCase = ({ children }) => {
  const { status } = useGame();
  return status === "idle" ? <GameMode /> : children;
};

export default GameCase;
