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
} from "@mui/material";

const GameMode = ({
  colNumValue,
  colNumOnChange,
  champsValue,
  champsOnChange,
  playOnClick,
  timerValue,
  timerOnChange,
}) => (
  <>
    <Box p={2}>
      <FormControl>
        <FormLabel id="tiles-controlled-radio-buttons-group">Tiles</FormLabel>
        <RadioGroup
          aria-labelledby="tiles-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={colNumValue}
          onChange={colNumOnChange}
        >
          <FormControlLabel value="10" control={<Radio />} label="8x10" />
          <FormControlLabel value="12" control={<Radio />} label="8x12" />
          <FormControlLabel value="14" control={<Radio />} label="8x14" />
          <FormControlLabel value="16" control={<Radio />} label="8x16" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="champs-controlled-radio-buttons-group">
          Champions
        </FormLabel>
        <RadioGroup
          aria-labelledby="champs-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={champsValue}
          onChange={champsOnChange}
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
      <Button variant="contained" onClick={() => playOnClick()}>
        Play
      </Button>
      <FormControl>
        <FormControlLabel
          control={<Switch />}
          label="Timer"
          checked={timerValue}
          onChange={timerOnChange}
        />
      </FormControl>
    </Stack>
  </>
);

export default GameMode;
