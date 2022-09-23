import * as React from "react";
import { Stack, IconButton, SvgIcon, Box, Typography } from "@mui/material";
import { ReactComponent as LoLSvg } from "../assets/svg/lol.svg"

const Tiles = ({ value }) => {
    return (
        <Stack spacing={1}>
            {
                value.map((x, xI) => (
                    <Stack
                        direction='row'
                        spacing={2}
                        key={xI}
                    >
                        {
                            x.map((y, yI) => (
                                <Box key={yI}>
                                    <IconButton size="small" color="inherit" >
                                        <SvgIcon fontSize="large" component={LoLSvg} inheritViewBox />
                                    </IconButton>
                                    {/*{`${xI}.${yI}`}*/}
                                </Box>
                            ))
                        }
                    </Stack>
                ))
            }
        </Stack>
    );
};

export default Tiles;
