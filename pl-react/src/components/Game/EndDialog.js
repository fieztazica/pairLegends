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
import { makeScore } from "../../utils/index";
import { useGame } from "../contexts/GameContext";
import { useUser } from "../contexts/UserContext";

function EndDialog() {
    const {
        status,
        renew,
        setStatus,
        beginAt,
        endAt,
        champs,
        tilesDone,
        colNum,
    } = useGame();

    const { user } = useUser();
    const { enqueueSnackbar } = useSnackbar();

    const handleOnBack = () => {
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

        if (!user) {
            localStorage.setItem("lastGame", matchModel);
            SnackBar(
                "You haven't login yet. Saved your score to local! Login to push your last score to cloud!",
                "warning"
            )();
        } else {
            postMatch(matchModel)
                .then((data) => {
                    localStorage.removeItem("lastGame");
                    SnackBar(`Saved!`, "success")();
                })
                .catch((err) => {
                    SnackBar(`${err.message}`, "error")();
                    console.error(err.message);
                    localStorage.setItem("lastGame", matchModel);
                    SnackBar(
                        "Saved your score to local! Relogin to push your last score to cloud!",
                        "error"
                    )();
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

    const score = () => makeScore(tilesDone, (8 * colNum), champs, (300 - (new Date(endAt) - new Date(beginAt)) / 1000)) || 0;

    React.useEffect(() => {
        if (status === "end")
            handleOnSave();
    }, [status])

    return (
        <Dialog open={status === "end"}>
            <DialogTitle>{"The game has ended!"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You scored {`${score()}`}!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOnBack}>Back</Button>
                <Button variant="contained" autoFocus onClick={handleOnPlayAgain}>
                    Play again
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EndDialog;
