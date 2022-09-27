import * as React from "react";
// components
import {
    Stack,
    IconButton,
    SvgIcon,
    Container,
    Grid,
    Box,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LinearProgressWithLabel from "../components/LinearProgressWithLabel";
import Tiles from "../components/Tiles";
import GameMode from "../components/GameMode";
// hooks
import { useSnackbar } from "notistack";
import * as util from "../utils";
import { useTimer } from "react-timer-hook";
import { getBoard } from "../utils/Generator";
import Champions from "../utils/champions.json";
import { getListPosItem } from "../utils/Binder";

export function Game() {
    const duration = 60 * 1000;
    const [colNum, setColNum] = React.useState(10);
    const [champs, setChamps] = React.useState(10);
    const [status, setStatus] = React.useState("idle");
    const [tiles, setTiles] = React.useState();
    const [champ1, setChamp1] = React.useState(null);
    const [champ2, setChamp2] = React.useState(null);
    const [width, height] = util.useWindowSize();
    const { enqueueSnackbar } = useSnackbar();
    const [lastExpiredTime, setLastExpiredTime] = React.useState(null);


    function getExpiredTime() {
        const time = new Date();
        time.setSeconds(time.getSeconds() + duration / 1000);
        return time;
    }

    const time = getExpiredTime();
    const isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
    );
    const screen = {
        width: 800,
        height: 600,
    };

    // init hooks
    // eslint-disable-next-line
    const { seconds, minutes, hours, isRunning, start, pause, resume, restart } =
        useTimer({ time, onExpire: () => timerOnExpired() });
    // eslint-disable-next-line
    const SnackBar =
        (message, variant, ...props) =>
            () => {
                enqueueSnackbar(message, {
                    variant,
                    ...props,
                });
            };

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

    const handleOnPlay = () => {
        const array = getBoard(8, parseInt(colNum), parseInt(champs));
        setTiles(array);
        setStatus("play");
        setChamp1(null);
        setChamp2(null);
        //restart(getExpiredTime())
        // let item = getListPosItem(array, 8, colNum, champs)
        // console.log(item)
    };

    const handleClickTiles = (x, y) => {
        // Check if this items is out of board
        if (tiles[x][y] === 0) return;

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

    React.useEffect(() => {
        const isSuitable =
            isMobile || width <= screen.width || height <= screen.height;
        setStatus(isSuitable ? "mobile" : "idle");
        // eslint-disable-next-line
        if ((status === "play" && isRunning) || isSuitable) pause();
        // eslint-disable-next-line
    }, [isMobile, width, height]);

    const GameStatusCase = ({ value }) => {


        switch (value) {
            case "play":
                return (
                    <Box sx={{ width: "100%" }}>
                        <Button variant="contained" onClick={() => handleOnIdle()}>
                            Idle
                        </Button>
                        <Box sx={{ width: "100%" }}>
                            <LinearProgressWithLabel
                                value={
                                    100 - ((minutes * 60 + seconds) / (duration / 1000)) * 100
                                }
                                label={`${minutes}:${seconds}`}
                            />
                        </Box>
                        <Box
                            alignItems="center"
                            display="flex"
                            flexDirection="column"
                            p={2}
                        >
                            <Tiles
                                champs={tiles}
                                champ1={champ1}
                                champ2={champ2}
                                onClick={handleClickTiles}
                            />
                        </Box>
                    </Box>
                );
            case "mobile":
                return (
                    <>
                        <Typography variant="h5" component="h5">
                            {isMobile ? (
                                "The game is designed for desktop only."
                            ) : (
                                <>
                                    Please make your browser wider than {screen.width}px and
                                    higher than {screen.height}px.
                                    <br />
                                    Current width, height: {width}px, {height}px
                                </>
                            )}
                        </Typography>
                        <Button
                            to="/"
                            variant="contained"
                            component={RouterLink}
                            startIcon={<HomeIcon fontSize="small" />}
                            sx={{
                                mt: 3,
                                "&:hover": {
                                    color: "primary.contrastText",
                                },
                            }}
                        >
                            Home
                        </Button>
                    </>
                );
            default:
                return <GameMode colNumValue={colNum} colNumOnChange={colNumChange} champsValue={champs} champsOnChange={champsChange} playOnClick={handleOnPlay} />;
        }
    };
    /**
     *
     | ${tiles ? `Champ1: ${Champions[`${tiles[champ1.x][champ1.y]}`]} Champ2: ${Champions[`${tiles[champ2.x][champ2.y]}`]}` : "Tiles empty"}
     */

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Container maxWidth="md">
                <Box alignItems="center" display="flex" flexDirection="column">
                    <Typography>
                        {`Status: ${status} | Tiles: 8x${colNum} Champs: ${champs} | Timer: ${hours}:${minutes}:${seconds} - ${isRunning ? "Running" : "Not running"
                            } | Last Play EndAt:  ${lastExpiredTime?.toLocaleString()}`}
                    </Typography>
                    <Typography>
                        {`${tiles && champ1 && champ2
                            ? `Champ1 (${champ1.x}.${champ1.y}): ${Champions[`${tiles[champ1.x][champ1.y]}`]
                            } Champ2 (${champ2.x}.${champ2.y}): ${Champions[`${tiles[champ2.x][champ2.y]}`]}`
                            : "Tiles empty"
                            }`}
                    </Typography>
                </Box>
                <Box alignItems="center" display="flex" flexDirection="column">
                    <GameStatusCase value={status} />
                </Box>
            </Container>
        </Box>
    );
}
