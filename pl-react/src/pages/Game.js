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
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LinearProgressWithLabel from "../components/LinearProgressWithLabel";
import Tiles from "../components/Tiles";
// hooks
import { useSnackbar } from "notistack";
import * as util from "../utils";
import { useTimer } from "react-timer-hook";
import { getBoard } from "../utils/Generator";

export function Game() {
  const duration = 300 * 1000;
  const [colNum, setColNum] = React.useState(8);
  const [champs, setChamps] = React.useState(6);
  const [status, setStatus] = React.useState("idle");
  const [tiles, setTiles] = React.useState();
  const [champ1, setChamp1] = React.useState({ x: -1, y: -1 });
  const [champ2, setChamp2] = React.useState({ x: -1, y: -1 });
  const [width, height] = util.useWindowSize();
  const { enqueueSnackbar } = useSnackbar();
  const [lastExpiredTime, setLastExpiredTime] = React.useState(null);

  function getExpiredTime() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + duration / 1000);
    return time;
  }

  var time = getExpiredTime();
  var isMobile = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  );
  var screen = {
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

  const colNumChange = (event) => {
    setColNum(parseInt(event.target.value));
  };

  const champsChange = (event) => {
    setChamps(parseInt(event.target.value));
  };

  const handleOnPlay = () => {
    let array = getBoard(8, parseInt(colNum), parseInt(champs));
    setTiles(array);
    setStatus("play");
    //restart(getExpiredTime())
  };

  const handleClickTiles = (pi, pj) => {
    // Check if this items is out of board
    if (tiles[pi][pj] === 0) return;

    if (!champ1 || (champ1.x < 0 && champ1.y < 0)) {
      setChamp1({ x: pi, y: pj });
      return;
    }

    setChamp2({ x: pi, y: pj });
  };

  const handleOnIdle = () => {
    setStatus("idle");
    pause();
  };

  React.useEffect(() => {
    const isSuitable =
      isMobile || width <= screen.width || height <= screen.height;
    if (status === "play" && isRunning) pause();
    setStatus(isSuitable ? "mobile" : "idle");
    // eslint-disable-next-line
  }, [isMobile, width, height]);

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
          <FormLabel id="champs-controlled-radio-buttons-group">
            Champions
          </FormLabel>
          <RadioGroup
            aria-labelledby="champs-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={champs}
            onChange={champsChange}
          >
            <FormControlLabel
              value="6"
              control={<Radio />}
              label="6 champions"
            />
            <FormControlLabel
              value="8"
              control={<Radio />}
              label="8 champions"
            />
            <FormControlLabel
              value="10"
              control={<Radio />}
              label="10 champions"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Button variant="contained" onClick={() => handleOnPlay()}>
        Play
      </Button>
    </>
  );

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
                `The game is designed for desktop only.`
              ) : (
                <>
                  Please make your browser wider than {screen.width}px and
                  higher than {screen.height}px.
                  <br />
                  Current width, height: {width}px, {height}px
                </>
              )}
            </Typography>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                startIcon={<HomeIcon fontSize="small" />}
                sx={{ mt: 3 }}
                variant="contained"
              >
                Home
              </Button>
            </Link>
          </>
        );
      default:
        return <GameMode />;
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Container maxWidth="md">
        <Box alignItems="center" display="flex" flexDirection="column">
          <Typography>
            {`Status: ${status} | Tiles: 8x${colNum} Champs: ${champs} | Timer: ${hours}:${minutes}:${seconds} - ${
              isRunning ? "Running" : "Not running"
            } | Last Play EndAt:  ${lastExpiredTime?.toLocaleString()}`}
          </Typography>
        </Box>
        <Box alignItems="center" display="flex" flexDirection="column">
          <GameStatusCase value={status} />
        </Box>
      </Container>
    </Box>
  );
}
