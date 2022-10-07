import * as React from "react";
// components
import { Container, Box } from "@mui/material";
// hooks
//import { useSnackbar } from "notistack";
import * as util from "../utils";
import { useTimer } from "react-timer-hook";
import { getBoard } from "../utils/Generator";
import { getListPosItem } from "../utils/Binder";
import PlayAble from "../components/PlayAble";
import DevStatus from "../components/DevStatus";
import GameCase from "../components/GameCase";

export const GameContext = React.createContext();

export function Game() {
  const duration = 60 * 1000;
  const [colNum, setColNum] = React.useState(10);
  const [champs, setChamps] = React.useState(10);
  const [fromChamps, setFromChamps] = React.useState(util.mixChampions());
  const [status, setStatus] = React.useState("idle");
  const [tiles, setTiles] = React.useState();
  const [timer, setTimer] = React.useState(false);
  const [champ1, setChamp1] = React.useState(0);
  const [champ2, setChamp2] = React.useState(0);
  //const { enqueueSnackbar } = useSnackbar();
  const [lastExpiredTime, setLastExpiredTime] = React.useState(null);

  function getExpiredTime() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + duration / 1000);
    return time;
  }

  const time = getExpiredTime();
  // init hooks
  // eslint-disable-next-line
  const { seconds, minutes, hours, isRunning, start, pause, resume, restart } =
    useTimer({ time, onExpire: () => timerOnExpired() });

  //const SnackBar =
  //    (message, variant, ...props) =>
  //        () => {
  //            enqueueSnackbar(message, {
  //                variant,
  //                ...props,
  //            });
  //        };

  const timerOnExpired = () => {
    setStatus("idle");
    setLastExpiredTime(new Date());
  };

  const colNumChange = (event, newValue) => {
    setColNum(parseInt(newValue));
  };

  const champsChange = (event, newValue) => {
    setChamps(parseInt(newValue));
  };

  const timerChange = (event) => {
    setTimer(event.target.checked);
  };

  const handleOnPlay = () => {
    const array = getBoard(8, parseInt(colNum), parseInt(champs));
    setTiles(array);
    setStatus("play");
    setChamp1(null);
    setChamp2(null);
    if (timer) restart(getExpiredTime());
    setFromChamps(util.mixChampions());
    // let item = getListPosItem(array, 8, colNum, champs)
    // console.log(item)
  };

  const handleClickTiles = (x, y) => {
    // Check if this items is out of board
    if (tiles[x][y] === -1) return;

    if (!champ1) {
      setChamp1({ x, y });
      return;
    }

    setChamp2({ x, y });
  };

  const handleOnIdle = () => {
    setStatus("idle");
    pause();
  };

  //   React.useEffect(() => {

  //   }, []);

  return (
    <GameContext.Provider
      value={{
        tiles,
        champs,
        timer,
        timerChange,
        status,
        colNum,
        colNumChange,
        champsChange,
        handleOnPlay,
        handleOnIdle,
        fromChamps,
        handleClickTiles,
        champ1,
        champ2,
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        resume,
        restart,
        time,
        duration,
        lastExpiredTime,
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Container maxWidth="md">
          <Box alignItems="center" display="flex" flexDirection="column">
            <PlayAble>
              <DevStatus />
              <GameCase />
            </PlayAble>
          </Box>
        </Container>
      </Box>
    </GameContext.Provider>
  );
}

export const useGame = () => React.useContext(GameContext);
