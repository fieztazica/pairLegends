import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const HowToPlayDialog = ({ openState, onClose, dRef }) => (
    <Dialog
        open={openState}
        onClose={onClose}
        aria-labelledby="how-to-play-dialog-title"
        aria-describedby="how-to-play-dialog-description"
    >
        <DialogTitle id="how-to-play-dialog-title">How to play</DialogTitle>
        <DialogContent dividers>
            <DialogContentText
                id="how-to-play-dialog-description"
                ref={dRef}
                tabIndex={-1}
            >
                Just play like normal pikachu game but with LoL champions not
                pokemons.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>I'm good</Button>
        </DialogActions>
    </Dialog>
);

export default HowToPlayDialog