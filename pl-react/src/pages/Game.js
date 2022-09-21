import * as React from "react";
import { Stack, LinearProgress, IconButton, SvgIcon, Container, Grid, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography } from "@mui/material";
import { ReactComponent as LoLSvg } from "../assets/svg/lol.svg"
import { useSnackbar } from 'notistack';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

const LinearProgressWithLabel = ({ value, label }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={value} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${label}s`}</Typography>
            </Box>
        </Box>
    );
}

export function Game() {
    const [colNum, setColNum] = React.useState("8");
    const [champs, setChamps] = React.useState("6");
    const [beginAt, setBeginAt] = React.useState(0);
    const [endAt, setEndAt] = React.useState(0);
    const [status, setStatus] = React.useState("idle");
    const [tiles, setTiles] = React.useState([[]]);

    const seconds = 60;
    const [secs, setSecs] = React.useState(seconds);
    const { enqueueSnackbar } = useSnackbar();

    const SnackBar = (message, variant, ...props) => () => {
        enqueueSnackbar(message, {
            variant,
            ...props
        });
    };

    var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)

    if (isMobile) {
        SnackBar("The game is designed for desktop only.", 'warning')()
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
                        <Typography>
                            The game is designed for desktop only.
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
        setBeginAt(Date.now)
        setEndAt(0)
        setStatus("play")
        reset()
    };

    const tick = () => secs === 0 ? reset() : setSecs(secs - 1);

    const reset = () => setSecs(parseInt(seconds));

    //React.useEffect(() => {
    //    const timerId = setInterval(() => {
    //        tick()
    //        if (secs === 0 && status === 'play') {
    //            setStatus("idle")
    //            setEndAt(Date.now)
    //        }
    //    }, 1000);
    //    return () => clearInterval(timerId);
    //});

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
            <Button variant="contained" onClick={handleOnPlay}>
                Play
            </Button>
        </>
    )

    const GameStatusCase = ({ value }) => {
        switch (value) {
            case 'play':
                return (
                    <Box sx={{ width: '100%' }}>
                        <Typography>
                            Playing
                        </Typography>
                        <Box>
                            <LinearProgressWithLabel value={100 - secs / seconds * 100} label={secs} />
                        </Box>
                        <Box
                            alignItems='center'
                            display='flex'
                            flexDirection='column'
                            p={2}
                        >
                            <Tiles />
                        </Box>
                        <Button variant="contained" onClick={() => setStatus("idle")}>
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
                        {`${status} 8x${colNum} ${champs} ${secs} ${beginAt} ${endAt}`}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
