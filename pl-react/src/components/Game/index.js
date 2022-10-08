import * as React from "react";
import { Box, Button } from "@mui/material";
import { useGame } from "../contexts/GameContext";
import GameTimer from "./GameTimer";
import Tiles from "./Tiles";
import { getListPosItem } from "../../utils/Binder";

export default function Gameplay() {
  let {
    status,
    tiles,
    timer,
    handleOnIdle,
    champ1,
    champ2,
    isNew,
    isJustReloaded,
    isWillReload,
    // doneLine,
    // hasLine,
    isExist,
    reloadHandler,
    setIsNew,
    setIsJustReloaded,
    listPosItem,
    newTiles,
    colNum,
    champs,
    setIsWillReload,
    // lastLines,
    setTiles,
    setChamp1,
    setChamp2,
    satisfiableItems,
    setTilesDone,
    count,
    // lines,
  } = useGame();

//   React.useEffect(() => {
//     if (!isExist()) {
//       reloadHandler();
//     }
//     console.log(`lastGame: ${localStorage.getItem("lastGame")}`);
//   }, []);

  React.useEffect(() => {
    console.log("load");
    if (!isExist()) {
      reloadHandler();
    }
    // When board is renew
    // if (isNew === true) {
    //   if (!isExist()) {
    //     reloadHandler();
    //   }
    //   setIsNew(false);
    // }

    // When board is reloaded
    // if (isJustReloaded === true) {
    //   if (!isExist()) {
    //     reloadHandler();
    //   }
    //   setIsJustReloaded(false);
    // }

    // Round 5: Check reload board
    // if (isWillReload === true) {
    //   // update item's position array
    //   listPosItem = getListPosItem(newTiles, 8, colNum, champs);

    //   if (!isExist()) {
    //     reloadHandler();
    //   }
    //   setIsWillReload(false);

    //   return;
    // }

    // Round 4: Remove line from board
    // if (doneLine) {
    //   lastLines.map((line) => (newTiles[line.x][line.y] = 0));

    //   newTiles[champ1.x][champ1.y] = newTiles[champ2.x][champ2.y] = 0;
    //   lastLines = [];

    //   setTimeout(() => {
    //     setTiles(newTiles);
    //     setChamp1(null);
    //     setChamp2(null);
    //     setIsWillReload(true);
    //   }, 500);

    //   doneLine = false;
    //   return;
    // }

    // Round 3: Display connected line
    // if (hasLine) {
    //   hasLine = false;
    //   doneLine = true;
    //   setTiles(newTiles);
    //   return;
    // }

    // Round 1: Check if 2 items is valid (not null) or not
    if (champ1 && champ2) {
      newTiles = tiles.slice();
      const value = newTiles[champ1.x][champ1.y];
      // Round 2: Check if 2 items is satisfiable or not. If yes then update score and assign lastLines value
      for (let i = 0; i < satisfiableItems[value].length; i++) {
        // compare two object
        if (
          (satisfiableItems[value][i].champ1.x === champ1.x &&
            satisfiableItems[value][i].champ1.y === champ1.y &&
            satisfiableItems[value][i].champ2.x === champ2.x &&
            satisfiableItems[value][i].champ2.y === champ2.y) ||
          (satisfiableItems[value][i].champ2.x === champ1.x &&
            satisfiableItems[value][i].champ2.y === champ1.y &&
            satisfiableItems[value][i].champ1.x === champ2.x &&
            satisfiableItems[value][i].champ1.y === champ2.y)
        ) {
          //   lastLines = satisfiableItems[value][i].lines.slice();

          //   if (lastLines.length > 0) {
          //     lastLines.map((line) => (newTiles[line.x][line.y] = line.value));
          //   }

          setTilesDone((prev) => prev + 2);

          //   hasLine = true;

          // Remove from listPosItems
          listPosItem[value][satisfiableItems[value][i].item1] =
            listPosItem[value][listPosItem[value].length - 1];
          listPosItem[value].pop();
          listPosItem[value][satisfiableItems[value][i].item2] =
            listPosItem[value][listPosItem[value].length - 1];
          listPosItem[value].pop();

          // Remove couple from satisfiableItems array
          satisfiableItems[value][i] =
            satisfiableItems[value][satisfiableItems[value].length - 1];
          satisfiableItems[value].pop();

          count--;

          return;
        }
      }

      //   lines = [];
      setChamp1(null);
      setChamp2(null);
    }
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Button variant="contained" onClick={() => handleOnIdle()}>
        Idle
      </Button>
      {timer && <GameTimer />}
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Tiles />
      </Box>
    </Box>
  );
}
