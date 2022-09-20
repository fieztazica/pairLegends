import * as React from "react";
import { LinearProgress, IconButton, SvgIcon, Container, Grid, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography } from "@mui/material";
import { ReactComponent as LoLSvg } from "../assets/svg/lol.svg"

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

    const seconds = 10;
    const [secs, setSecs] = React.useState(seconds);

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

    React.useEffect(() => {
        const timerId = setInterval(() => {
            tick()
            if (secs === 0 && status === 'play') {
                setStatus("idle")
                setEndAt(Date.now)
            }
        }, 1000);
        return () => clearInterval(timerId);
    });

    const Tiles = () => (
        <>
            <Grid container direction="column">
                {
                    tiles.map((x, xI) => (
                        <Grid container>
                            {
                                x.map((y, yI) =>
                                (
                                    <Grid item p={1}>
                                        <IconButton size="small" color="inherit" >
                                            <SvgIcon fontSize="large" component={LoLSvg} inheritViewBox />
                                        </IconButton>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )

    const GameMode = () => (<>
        <Box >
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
    </>)

    const GameStatusCase = ({ value }) => {
        switch (value) {
            case 'play':
                return (
                    <>
                        <Typography>
                            Playing
                        </Typography>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgressWithLabel value={100 - secs / seconds * 100} label={secs} />
                        </Box>
                        <Box>
                            <Container>
                                <Tiles />
                            </Container>
                        </Box>
                        <Button variant="contained" onClick={() => setStatus("idle")}>
                            Idle
                        </Button>
                    </>
                );
            default:
                return <GameMode />;
        }
    }

    return (
        <Box>
            {<GameStatusCase value={status} />}
            <Typography>
                {`${status} 8x${colNum} ${champs} ${secs} ${beginAt} ${endAt}`}
            </Typography>
        </Box>
    );
}
