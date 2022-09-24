import * as React from "react";
import { Stack, IconButton, SvgIcon, Box, Typography } from "@mui/material";
import Champion from "./Champion";

const Tiles = ({ champs, champ1, champ2, onClick }) => {
  const getTile = (x, y, selected) => (
    <Champion
      key={`${x}.${y}`}
      value={champs[x][y]}
      selected={selected}
      onClick={() => onClick(x, y)}
    />
  );

  return (
    <Stack>
      {champs.map((x, xI) => (
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
    </Stack>
  );
};

export default Tiles;
