import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import {
  Chip,
  Divider,
  Link,
  List,
  ListItemText,
  ListSubheader,
  ListItem,
} from "@mui/material";
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
            <List
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Tech
                </ListSubheader>
              }
            >
              <ListItem>Client</ListItem>
              <ListItemText>React, MUI</ListItemText>
            </List>
            <dl>
              <dt>Client</dt>
              <dd>React, MUI</dd>
              <dt>Server</dt>
              <dd>.NET Core, Entity Framework</dd>
            </dl>
          </Box>
          <Divider component={Box} />
          <Box p={1}>
            <ul>
              <li>
                <Link
                  href="https://github.com/duonghan/pikachu-react"
                  underline="none"
                  target="_blank"
                  rel="noreferrer"
                >
                  Admired Repo
                </Link>
              </li>
            </ul>
          </Box>
          <Divider component={Box} />
          <Box p={1}>
            <dl>
              <dt>2080600246 - Hoang Tien Dat</dt>
              <dt>2080600759 -Huynh Nhat Truong</dt>
              <dt>2080600763 - Pham Huynh Nhat Truong</dt>
              <dt>2080600235 - Le Nguyen Viet Duong</dt>
            </dl>
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
