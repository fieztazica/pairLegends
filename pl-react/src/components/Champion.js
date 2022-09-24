import * as React from "react";
import {
  Stack,
  IconButton,
  SvgIcon,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const BootstrapButton = styled(Button)({
  padding: "1px 0px",
  height: "63px",
  borderRadius: 0,
  transition: "0.5s",
  "&:hover": {
    img: {
      opacity: "0.8",
    },
  },
});

const Champion = ({ value, onClick, selected = false }) => {
  return (
    <BootstrapButton
      style={
        selected
          ? {
              opacity: "0.8",
              border: "2px solid #5048E5",
            }
          : null
      }
      onClick={onClick}
      alt=""
      disabled={value === 0 ? true : false}
    >
      <img
        src={`/static/images/pl_${value}.png`}
        width={60}
        height={60}
        style={value === 0 ? { display: "none" } : null}
        alt={`${value}`}
      />
    </BootstrapButton>
  );
};

export default Champion;
