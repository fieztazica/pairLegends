import * as React from "react";
// components
import { Stack, IconButton, SvgIcon, Container, Grid, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LinearProgressWithLabel from "../components/LinearProgressWithLabel";
import Tiles from "../components/Tiles";
// hooks
import { useSnackbar } from 'notistack';
import { useWindowSize } from "../utils"
import { useTimer } from 'react-timer-hook';

export function Game() {
    const duration = 300 * 1000;
    const [colNum, setColNum] = React.useState("8");
    const [champs, setChamps] = React.useState("6");
    const [status, setStatus] = React.useState("idle");
    const [tiles, setTiles] = React.useState([[]]);
    const [width, height] = useWindowSize();
    const { enqueueSnackbar } = useSnackbar();
    const [lastExpiredTime, setLastExpiredTime] = React.useState(null);

    function getExpiredTime() {
        const time = new Date();
        time.setSeconds(time.getSeconds() + duration / 1000);
        return time;
    }

    var time = getExpiredTime()
    var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)
    var screen = {
        width: 1280,
        height: 720
    }

    // init hooks
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
    

    const SnackBar = (message, variant, ...props) => () => {
        enqueueSnackbar(message, {
            variant,
            ...props
        });
    };

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

    React.useEffect(() => {
        if (isMobile || width <= screen.width || height <= screen.height) {
            if (isRunning) pause();
            setStatus('mobile');
        }
        else {
            if (!isRunning) resume();
            setStatus('idle')
        }
    }, [isMobile, width, height])

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
                return (
                    <Box sx={{ width: '100%' }}>
                        <Button variant="contained" onClick={() => handleOnIdle()}>
                            Idle
                        </Button>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgressWithLabel value={100 - (minutes * 60 + seconds) / (duration / 1000) * 100} label={`${minutes}:${seconds}`} />
                        </Box>
                        <Box
                            alignItems='center'
                            display='flex'
                            flexDirection='column'
                            p={2}
                        >
                            <Tiles value={tiles} />
                        </Box>
                    </Box>
                );
            case 'mobile':
                return (
                    <>
                        <Typography variant="h5" component="h5">
                            {isMobile ? `The game is designed for desktop only.` : (<>Please make your brower wider than {screen.width}px and higher than {screen.height}px.<br />Current width, height: {width}px, {height}px</>)}
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
                    </>

                )
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
