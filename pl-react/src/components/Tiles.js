import * as React from "react";
import { Stack, IconButton, SvgIcon, Box, Typography } from "@mui/material";
import Champion from "./Champion";
// import { getChampName, mixChampions } from "../utils/index";
import { useGame } from "../pages/Game";

const Tiles = () => {
  const { tiles, champ1, champ2, handleClickTiles } = useGame();
  const getTile = (x, y, selected) => (
    <Champion
      key={`${x}.${y}`}
      value={tiles[x][y]}
      selected={selected}
      onClick={() => handleClickTiles(x, y)}
    />
  );

  return (
    <Box>
      {tiles.map((x, xI) => (
        <Stack direction="row" key={xI}>
          {x.map((y, yI) => {
            let selected = false;

            if (champ1 && champ1.x === xI && champ1.y === yI) {
              selected = true;
            } else if (champ2 && champ2.x === xI && champ2.y === yI) {
              selected = true;
            }

            return getTile(xI, yI, selected);
          })}
        </Stack>
      ))}
    </Box>
  );
};

export default Tiles;
