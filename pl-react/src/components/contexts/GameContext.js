import * as React from "react";
import { useTimer } from "react-timer-hook";
import { mixChampions } from "../../utils";
import { getBoard } from "../../utils/Generator";

export function getExpiredTime(duration) {
    const time = new Date();
    time.setSeconds(time.getSeconds() + duration / 1000);
    return time;
}

export const GameContext = React.createContext();

export const GameProvider = ({ children }) => {
    const duration = 300 * 1000;
    const [colNum, setColNum] = React.useState(10);
    const [champs, setChamps] = React.useState(10);
    const [fromChamps, setFromChamps] = React.useState(mixChampions());
    const [status, setStatus] = React.useState("idle");
    const [tiles, setTiles] = React.useState();
    const [timer, setTimer] = React.useState(true);
    const [champ1, setChamp1] = React.useState(null);
    const [champ2, setChamp2] = React.useState(null);
    const [tilesDone, setTilesDone] = React.useState(0);
    const [beginAt, setBeginAt] = React.useState(null);
    const [endAt, setEndAt] = React.useState(null);

    const { seconds, minutes, hours, isRunning, start, pause, resume, restart } =
        useTimer({
            expiryTimestamp: getExpiredTime(duration),
            autoStart: false,
            onExpire: () => onEnd(),
        });

    const onEnd = () => {
        setChamp1(null);
        setChamp2(null);
        setStatus("end");
        setEndAt(new Date());
        pause();
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

    const renew = () => {
        const _newTiles = getBoard(8, colNum, champs);
        setTiles(_newTiles);
        setStatus("play");
        setBeginAt(new Date());
        setEndAt(null);
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
                setChamp1({ x, y });
                return;
            }

            setChamp2({ x, y });
        }
    };

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
                beginAt,
                endAt,
                // functions
                start,
                pause,
                resume,
                restart,
                handleClickTiles,
                timerChange,
                colNumChange,
                champsChange,
                setTiles,
                setChamp1,
                setChamp2,
                setTilesDone,
                setStatus,
                onEnd,
                renew,
                setBeginAt,
                setEndAt,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => React.useContext(GameContext);
