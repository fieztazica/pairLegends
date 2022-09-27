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
import { getChampName } from "../utils/index";

const BootstrapButton = styled(Button)({
    padding: "1px 0px",
    height: "63px",
    borderRadius: 0,
    transition: "0.5s",
    "&:hover": {
        img: {
            opacity: "0.5",
        },
    },
});

const Champion = ({ value, onClick, selected = false }) => {
    return (
        <BootstrapButton
            style={
                selected
                    ? { border: "2px solid #D14343" }
                    : null
            }
            onClick={onClick}
            alt=""
            disabled={value === 0}
        >
            <img
                src={`/static/images/${getChampName(value)}.png`}
                width={60}
                height={60}
                style={
                    value === 0
                        ? { display: "none" }
                        : (
                            selected
                                ? { border: "6px solid #FFB020" }
                                : null
                        )
                }
                alt={`${value}`}
            />
        </BootstrapButton>
    );
};

export default Champion;
