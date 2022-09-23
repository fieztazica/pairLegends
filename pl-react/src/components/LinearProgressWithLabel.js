import * as React from "react";
import { LinearProgress, Box, Typography } from "@mui/material";

const LinearProgressWithLabel = ({ value, label }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={value} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                    {label}
                </Typography>
            </Box>
        </Box>
    );
};

export default LinearProgressWithLabel;
