import * as React from "react";
import {useTimer} from "react-timer-hook";
import {mixChampions} from "../../utils";
import {getBoard, reloadBoard} from "../../utils/Generator";

export function getExpiredTime(duration) {
    const time = new Date();
    time.setSeconds(time.getSeconds() + duration / 1000);
    return time;
}

export const GameContext = React.createContext();

export const GameProvider = ({children}) => {
    const duration = 15 * 1000;
    const [colNum, setColNum] = React.useState(10);
    const [champs, setChamps] = React.useState(10);
    const [fromChamps, setFromChamps] = React.useState(mixChampions());
    const [status, setStatus] = React.useState("idle");
    const [tiles, setTiles] = React.useState();
    const [tilesDone, setTilesDone] = React.useState(0);
    const [timer, setTimer] = React.useState(false);
    const [champ1, setChamp1] = React.useState(null);
    const [champ2, setChamp2] = React.useState(null);
    const [isNew, setIsNew] = React.useState(false);
    const [lastExpiredTime, setLastExpiredTime] = React.useState(null);
    const {seconds, minutes, hours, isRunning, start, pause, resume, restart} =
        useTimer({
            expiryTimestamp: getExpiredTime(duration),
            autoStart: false,
            onExpire: () => timerOnExpired(),
        });

    const timerOnExpired = () => {
        setStatus("end");
        setLastExpiredTime(new Date());
    };

    const saveScore = (endAt) => {
        localStorage.setItem("lastGame", JSON.stringify({
            endAt: new Date(endAt).toJSON(),
            champs: champs,
            tiles: 8 * (colNum),
            tilesDone: (tilesDone),
        }));
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
        const _new = getBoard(8, colNum, champs);
        setTiles(_new);
        setStatus("play");
        setChamp1(null);
        setChamp2(null);
        setFromChamps(mixChampions());
        setTilesDone(0);
        if (timer) restart(getExpiredTime(duration));
    };

    const handleClickTiles = (x, y) => {
        if (status === "play") {
            // Check if this items is out of board
            if (tiles[x][y] === -1) return;

            if (!champ1) {
                setChamp1({x, y});
                return;
            }

            setChamp2({x, y});
        }
    };

    const handleOnIdle = () => {
        setStatus("idle");
        pause();
    };

    // const reloadHandler = () => {
    //   const oldTiles = [...tiles];
    //   const _newTiles = reloadBoard(oldTiles, 8, colNum, champs);
    //   setTiles(_newTiles);
    // };

    return (
        <GameContext.Provider
            value={{
                // variables
                duration,
                tiles,
                champs,
                timer,
                status,
                colNum,
                tilesDone,
                fromChamps,
                champ1,
                champ2,
                seconds,
                minutes,
                hours,
                isRunning,
                // isWillReload,
                // isJustReloaded,
                isNew,
                lastExpiredTime,
                // functions
                start,
                pause,
                resume,
                restart,
                handleClickTiles,
                timerChange,
                colNumChange,
                champsChange,
                handleOnPlay,
                handleOnIdle,
                // reloadHandler,
                setTiles,
                setChamp1,
                setChamp2,
                setTilesDone,
                saveScore,
                // setIsWillReload,
                // setIsJustReloaded,
                setIsNew,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => React.useContext(GameContext);
