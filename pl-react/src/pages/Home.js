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
import HowToPlayDialog from "../components/HowToPlayDialog";
// import CreditsDialog from "../components/CreditsDialog";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import GroupIcon from "@mui/icons-material/Group";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

export function Home() {
  const [openHtpDialog, setOpenHtpDialog] = React.useState(false);
  //   const [openCreditsDialog, setOpenCreditsDialog] = React.useState(false);

  const htpDescriptionElementRef = React.useRef(null);
  //   const credDescriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openHtpDialog) {
      const { current: descriptionElement } = htpDescriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    // if (openCreditsDialog) {
    //   const { current: descriptionElement } = credDescriptionElementRef;
    //   if (descriptionElement !== null) {
    //     descriptionElement.focus();
    //   }
    // }
  }, [openHtpDialog]);

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
      fullWidth
      size="large"
      sx={{
        m: 1,
        "a:hover": {
          color: "primary.contrastText",
        },
      }}
    >
      <Button to="/game" component={RouterLink} startIcon={<PlayArrowIcon />}>
        Play Game
      </Button>
      <Button
        onClick={() => setOpenHtpDialog(true)}
        component={Link}
        startIcon={<QuestionMarkIcon />}
      >
        How to play
      </Button>
      <Button
        rel="noreferrer"
        href="https://github.com/fiezt1492/pairLegends#readme"
        target="_blank"
        // onClick={() => setOpenCreditsDialog(true)}
        component={Link}
        startIcon={<GroupIcon />}
      >
        Credits
      </Button>
      <Button
        rel="noreferrer"
        href="https://discord.io/owlvernyte"
        target="_blank"
        component={Link}
        startIcon={<QuestionAnswerIcon />}
      >
        Support
      </Button>
    </ButtonGroup>
  );

  const NavButtonGroup = () => (
    <ButtonGroup
      fullWidth
      size="large"
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
          <Box
            minWidth="60%"
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <HomeTitle />
            <GameButtonGroup />
            <Box m={1}>Nav Zone</Box>
            <NavButtonGroup />
          </Box>

          <HowToPlayDialog
            openState={openHtpDialog}
            onClose={() => setOpenHtpDialog(false)}
            dref={htpDescriptionElementRef}
          />
          {/* <CreditsDialog
            openState={openCreditsDialog}
            onClose={() => setOpenCreditsDialog(false)}
            dref={credDescriptionElementRef}
          /> */}
        </Box>
      </Container>
    </Box>
  );
}
