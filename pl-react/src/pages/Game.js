import * as React from "react";
import { Stack, LinearProgress, IconButton, SvgIcon, Container, Grid, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography } from "@mui/material";
import { ReactComponent as LoLSvg } from "../assets/svg/lol.svg"
import { useSnackbar } from 'notistack';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { useTimer } from 'react-timer-hook';
import Moment from 'react-moment';
import moment from 'moment';

const LinearProgressWithLabel = ({ value, label }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={value} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                    {label}s
                </Typography>
            </Box>
        </Box>
    );
}

function useWindowSize() {
    const [size, setSize] = React.useState([0, 0]);
    React.useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export function Game() {
    const duration = 5 * 1000;
    const [colNum, setColNum] = React.useState("8");
    const [champs, setChamps] = React.useState("6");
    const [status, setStatus] = React.useState("idle");
    const [tiles, setTiles] = React.useState([[]]);
    const [width, height] = useWindowSize();
    const [lastExpiredTime, setLastExpiredTime] = React.useState(null);

    function getExpiredTime() {
        const time = new Date();
        time.setSeconds(time.getSeconds() + duration / 1000);
        return time;
    }

    let time = getExpiredTime()

    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ time, onExpire: () => timerOnExpired() });

    const { enqueueSnackbar } = useSnackbar();

    const SnackBar = (message, variant, ...props) => () => {
        enqueueSnackbar(message, {
            variant,
            ...props
        });
    };

    var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)

    if (isMobile || width <= 800 || height <= 720) {
        if (status === 'play') setStatus("idle")
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Container maxWidth="md">
                    <Box
                        alignItems='center'
                        display='flex'
                        flexDirection='column'
                    >
                        <Typography variant="h5" component="h5">
                            {isMobile ? `The game is designed for desktop only.` : (<>Please make your brower wider than 800px.<br />Current width, height: {width}px, {height}px</>)}
                        </Typography>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button
                                startIcon={(<HomeIcon fontSize="small" />)}
                                sx={{ mt: 3 }}
                                variant="contained"
                            >
                                Home
                            </Button>
                        </Link>
                    </Box>
                </Container>

            </Box>
        );
    }

    const timerOnExpired = () => {
        setStatus('idle')
        setLastExpiredTime(new Date())
    }

    const colNumChange = (event) => {
        setColNum(event.target.value);
    };

    const champsChange = (event) => {
        setChamps(event.target.value);
    };

    const handleOnPlay = () => {
        let array = []
        for (let x = 0; x < 8; x++) {
            let colArray = [];
            for (let y = 0; y < parseInt(colNum); y++)
                colArray[y] = `${x}.${y}`;
            array[x] = colArray;
        }
        setTiles(array)
        setStatus("play")
        restart(getExpiredTime())
    };

    const handleOnIdle = () => {
        setStatus("idle")
        pause()
    }

    const Tiles = () => (
        <Stack spacing={1}>
            {
                tiles.map((x, xI) => (
                    <Stack
                        direction='row'
                        spacing={2}
                    >
                        {
                            x.map((y, yI) => (
                                <Box >
                                    <IconButton size="small" color="inherit" >
                                        <SvgIcon fontSize="large" component={LoLSvg} inheritViewBox />
                                    </IconButton>
                                    {/*{`${xI}.${yI}`}*/}
                                </Box>
                            ))
                        }
                    </Stack>
                ))
            }
        </Stack>
    )

    const GameMode = () => (
        <>
            <Box p={2}>
                <FormControl>
                    <FormLabel id="tiles-controlled-radio-buttons-group">Tiles</FormLabel>
                    <RadioGroup
                        aria-labelledby="tiles-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={colNum}
                        onChange={colNumChange}
                    >
                        <FormControlLabel value="8" control={<Radio />} label="8x8" />
                        <FormControlLabel value="10" control={<Radio />} label="8x10" />
                        <FormControlLabel value="12" control={<Radio />} label="8x12" />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel id="champs-controlled-radio-buttons-group">Champions</FormLabel>
                    <RadioGroup
                        aria-labelledby="champs-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={champs}
                        onChange={champsChange}
                    >
                        <FormControlLabel value="6" control={<Radio />} label="6 champions" />
                        <FormControlLabel value="8" control={<Radio />} label="8 champions" />
                        <FormControlLabel value="10" control={<Radio />} label="10 champions" />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Button variant="contained" onClick={() => handleOnPlay()}>
                Play
            </Button>
        </>
    )

    const GameStatusCase = ({ value }) => {
        switch (value) {
            case 'play':
                const secs = minutes * 60 + seconds
                return (
                    <Box sx={{ width: '100%' }}>
                        <Typography>
                            Playing
                        </Typography>
                        <Box>
                            <LinearProgressWithLabel value={100 - secs / (duration / 1000) * 100} label={secs} />
                        </Box>
                        <Box
                            alignItems='center'
                            display='flex'
                            flexDirection='column'
                            p={2}
                        >
                            <Tiles />
                        </Box>
                        <Button variant="contained" onClick={() => handleOnIdle()}>
                            Idle
                        </Button>
                    </Box>
                );
            default:
                return <GameMode />;
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Container maxWidth="md">
                <Box
                    alignItems='center'
                    display='flex'
                    flexDirection='column'
                >
                    <GameStatusCase value={status} />
                </Box>
                <Box>
                    <Typography>
                        {`${status} 8x${colNum} ${champs} ${hours}:${minutes}:${seconds} ${isRunning ? 'Running' : 'Not running'} ${lastExpiredTime?.toLocaleString()}`}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
