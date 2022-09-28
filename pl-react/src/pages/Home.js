import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Link as RouterLink, Router } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LinkRouter from "../components/LinkRouter";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip, Divider } from "@mui/material";

export function Home() {
  const [openHtpDialog, setOpenHtpDialog] = React.useState(false);
  const [openCreditsDialog, setOpenCreditsDialog] = React.useState(false);

  const htpDescriptionElementRef = React.useRef(null);
  const credDescriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openHtpDialog) {
      const { current: descriptionElement } = htpDescriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    if (openCreditsDialog) {
      const { current: descriptionElement } = credDescriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openHtpDialog, openCreditsDialog]);

  const HomeTitle = () => (
    <Box m={1}>
      <Typography align="center" color="primary" variant="h1">
        HOME
      </Typography>
      <Typography align="center" color="secondary" variant="subtitle2">
        Make Pikachu great again.
      </Typography>
    </Box>
  );

  const GameButtonGroup = () => (
    <ButtonGroup
      variant="contained"
      orientation="vertical"
      sx={{
        m: 1,
        "a:hover": {
          color: "primary.contrastText",
        },
      }}
    >
      <Button to="/game" component={RouterLink}>
        Play Game
      </Button>
      <Button onClick={() => setOpenHtpDialog(true)} component={Link}>
        How to play
      </Button>
      <Button onClick={() => setOpenCreditsDialog(true)} component={Link}>
        Credits
      </Button>
      <Button
        rel="noreferrer"
        href="https://discord.io/owlvernyte"
        target="_blank"
        component={Link}
      >
        Support
      </Button>
    </ButtonGroup>
  );

  const NavButtonGroup = () => (
    <ButtonGroup
      variant="contained"
      aria-label="outlined primary button group"
      sx={{
        m: 1,
        "a:hover": {
          color: "primary.contrastText",
        },
      }}
    >
      <Button href="/fetch-data">Fetch Data</Button>
      <Button href="/counter">Counter</Button>
    </ButtonGroup>
  );

  const HowToPlayDialog = () => (
    <Dialog
      open={openHtpDialog}
      onClose={() => setOpenHtpDialog(false)}
      aria-labelledby="how-to-play-dialog-title"
      aria-describedby="how-to-play-dialog-description"
    >
      <DialogTitle id="how-to-play-dialog-title">How to play</DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id="how-to-play-dialog-description"
          ref={htpDescriptionElementRef}
          tabIndex={-1}
        >
          Nhiệm vụ của bạn rất đơn giản:
          <br />
          - Chỉ cần tìm hai hình giống nhau và đường nối giữa hai hình đó gấp khúc không quá ba lần, click vào để loại bỏ chúng.
          <br />
          - Mỗi lần loại bỏ được hai hình bạn sẽ ghi điểm, trò chơi hoàn thành khi bạn loại bỏ được hết các hình trước khi hết giờ, thời gian còn lại càng nhiều điểm của bạn càng cao.
          <br />
          - Khi không còn nước di chuyển trò chơi sẽ tự động đảo lại hình, sô lần đảo là có giới hạn. Khi cho chơi kết thúc, điểm sô được cộng thêm số lần đảo.
          <br /> 
            
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenHtpDialog(false)}>I'm good</Button>
      </DialogActions>
    </Dialog>
  );

  const CreditsDialog = () => (
    <Dialog
      open={openCreditsDialog}
      onClose={() => setOpenCreditsDialog(false)}
      aria-labelledby="credits-dialog-title"
      aria-describedby="credits-dialog-description"
    >
      <DialogTitle id="credits-dialog-title">Credits - Group 3</DialogTitle>
      <DialogContent dividers>
        <Box
          id="credits-dialog-description"
          ref={credDescriptionElementRef}
          tabIndex={-1}
        >
          <Box minWidth="50vw" m={1}>
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
        <Button onClick={() => setOpenCreditsDialog(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box
      component="main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <HomeTitle />
          <GameButtonGroup />
          <HowToPlayDialog />
          <CreditsDialog />
          <Box m={1}>Nav Zone</Box>
          <NavButtonGroup />
        </Box>
      </Container>
    </Box>
  );
}
