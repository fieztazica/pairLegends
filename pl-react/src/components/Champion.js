import * as React from "react";
import { Stack, IconButton, SvgIcon, Box, Typography, Button } from "@mui/material";

const Champion = ({ value, onClick, selected = false }) => {
    return (
        <Button
            style={
                selected ? { border: '1px solid crimson' } : null
            }
            sx={{ pt: 1.4, pb: 1.4 }}
            onClick={onClick}
            size="small"
            color="inherit"
            alt=''
            disabled={value === 0 ? true : false}
        >
            <img
                src={`/static/images/pl_${value}.png`}
                width={40}
                height={40}
                style={value === 0 ? { display: 'none' } : null}
                alt={`${value}`}
            />
        </Button>
    );
};

export default Champion;
