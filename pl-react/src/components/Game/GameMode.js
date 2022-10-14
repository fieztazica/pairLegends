import * as React from "react";
// components
import {
    Box,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Switch,
    Stack,
    Divider,
    Paper,
    Typography,
    Tooltip
} from "@mui/material";
import { useGame } from "../contexts/GameContext";
const GameMode = () => {
    const {
        colNum,
        colNumChange,
        champs,
        champsChange,
        renew,
        timer,
        timerChange,
    } = useGame();

    const handleOnPlay = () => renew();

    return (
        <>
            <Tooltip arrow followCursor title="The harder you choose, the higher score you get.">
                <Box>
                    <Typography align="center" color="primary" variant="h2">
                        DIFFICULTY
                    </Typography>
                    <Typography align="center" color="secondary" variant="subtitle2" gutterBottom>
                        Select your game mode<br/>You have 5 mins to finish the challenge
                    </Typography>
                </Box>
            </Tooltip>
            <Box p={2}>
                <FormControl>
                    <Tooltip arrow title={`${8 * colNum} tiles in total`}>
                        <FormLabel align="center" id="tiles-controlled-radio-buttons-group">Tiles</FormLabel>
                    </Tooltip>
                    <RadioGroup
                        aria-labelledby="tiles-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={colNum}
                        onChange={colNumChange}
                    >
                        <FormControlLabel value="10" control={<Radio />} label="8x10" />
                        <FormControlLabel value="12" control={<Radio />} label="8x12" />
                        <FormControlLabel value="14" control={<Radio />} label="8x14" />
                        <FormControlLabel value="16" control={<Radio />} label="8x16" />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <Tooltip arrow title={`${champs} champs will be randomly generated`}>
                        <FormLabel align="center" id="champs-controlled-radio-buttons-group">
                            Champions
                        </FormLabel>
                    </Tooltip>
                    <RadioGroup
                        aria-labelledby="champs-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={champs}
                        onChange={champsChange}
                    >
                        <FormControlLabel
                            value="10"
                            control={<Radio />}
                            label="10 champions"
                        />
                        <FormControlLabel
                            value="20"
                            control={<Radio />}
                            label="20 champions"
                        />
                        <FormControlLabel
                            value="30"
                            control={<Radio />}
                            label="30 champions"
                        />
                        <FormControlLabel
                            value="40"
                            control={<Radio />}
                            label="40 champions"
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Stack
                direction="row"
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
            >
                <Tooltip arrow title={`${8 * colNum} tiles, ${champs} champs. You have 5 mins to clear all of these!`}>
                    <Button variant="contained" onClick={handleOnPlay}>
                        Play
                    </Button>
                </Tooltip>
                {!(
                    process.env.REACT_APP_VERCEL_ENV === "production" ||
                    process.env.NODE_ENV === "production"
                ) && (
                        <FormControl>
                            <FormControlLabel
                                control={<Switch />}
                                label="Timer"
                                checked={timer}
                                onChange={timerChange}
                            />
                        </FormControl>
                    )}
            </Stack>
        </>
    );
};

export default GameMode;
