import { Button, Typography } from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import * as util from "../../utils";

export default function PlayAble({ children }) {
  const [width, height] = util.useWindowSize();

  const isMobile = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  );

  const isDev = !(
    process.env.REACT_APP_VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production"
  );

  const screen = {
    width: 800,
    height: 600,
  };

  return isDev ||
    !(isMobile || width <= screen.width || height <= screen.height) ? (
    children
  ) : (
    <>
      <Typography variant="h5" component="h5">
        {isMobile ? (
          "The game is designed for desktop only."
        ) : (
          <>
            Please make your browser wider than {screen.width}px and higher than{" "}
            {screen.height}px.
            <br />
            Current width, height: {width}px, {height}px
          </>
        )}
      </Typography>
      <Button
        to="/"
        variant="contained"
        component={RouterLink}
        startIcon={<HomeIcon fontSize="small" />}
        sx={{
          mt: 3,
          "&:hover": {
            color: "primary.contrastText",
          },
        }}
      >
        Home
      </Button>
    </>
  );
}
