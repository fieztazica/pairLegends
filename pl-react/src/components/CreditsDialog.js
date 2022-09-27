import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Chip, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CreditsDialog = ({ openState, onClose, dRef }) => (
  <Dialog
    open={openState}
    onClose={onClose}
    aria-labelledby="credits-dialog-title"
    aria-describedby="credits-dialog-description"
  >
    <DialogTitle id="credits-dialog-title">Credits - Group 3</DialogTitle>
    <DialogContent dividers>
      <Box id="credits-dialog-description" ref={dRef} tabIndex={-1}>
        <Box m={1}>
          <Box p={1}>
            <Divider sx={{ pb: 2 }}>
              <Chip label="TEAM" />
            </Divider>
            <Typography align="center">
              2080600246 - Hoang Tien Dat
              <br />
              2080600759 -Huynh Nhat Truong
              <br />
              2080600763 - Pham Huynh Nhat Truong
              <br />
              2080600235 - Le Nguyen Viet Duong
            </Typography>
          </Box>
          <Box p={1}>
            <Divider sx={{ pb: 2 }}>
              <Chip label="ACKNOWLEDGEMENTS" />
            </Divider>
            <Typography align="center">reeact</Typography>
          </Box>
        </Box>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

export default CreditsDialog;
