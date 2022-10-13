import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { postMatch } from "../../utils/api";
import { useGame } from "../contexts/GameContext";
import { useUser } from "../contexts/UserContext";

function EndDialog() {
  const {
    openEndDialog,
    setOpenEndDialog,
    renew,
    setStatus,
    beginAt,
    endAt,
    champs,
    tilesDone,
    colNum,
  } = useGame();
  const [loading, setLoading] = React.useState(false);
  const { user } = useUser();
  const { enqueueSnackbar } = useSnackbar();

  const handleOnBack = () => {
    setOpenEndDialog(false);
    setStatus("idle");
  };

  const handleOnPlayAgain = () => renew();

  const handleOnSave = () => {
    const matchModel = JSON.stringify({
      id: user?.id,
      beginAt: beginAt.toJSON(),
      endAt: endAt.toJSON(),
      champs: champs,
      tiles: 8 * colNum,
      tilesDone: tilesDone,
    });
    setLoading(true);

    if (!user) {
      localStorage.setItem("lastGame", JSON.stringify(matchModel));
      SnackBar(
        "You haven't login yet. Saved your score to local! Login to push your last score to cloud!",
        "warning"
      )();
      setLoading(false);
    } else {
      postMatch(matchModel)
        .then((data) => {
          setLoading(false);
          SnackBar(`Saved!`, "success")();
        })
        .catch((err) => {
          setLoading(false);
          SnackBar(`${err.message}`, "error")();
          console.error(err.message);
        });
    }
  };

  const SnackBar =
    (message, variant, ...props) =>
    () => {
      enqueueSnackbar(message, {
        variant,
        ...props,
      });
    };

  return (
    <Dialog open={openEndDialog}>
      <DialogTitle>{"The game has ended!"}</DialogTitle>
      <DialogContent>
        <DialogContentText>abc dat de di ia</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnBack}>Back</Button>
        <LoadingButton loading={loading} onClick={handleOnSave}>
          Save
        </LoadingButton>
        <Button autoFocus onClick={handleOnPlayAgain}>
          Play again
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EndDialog;
