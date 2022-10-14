import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const HomeTitle = () => (
    <Box pb={1}>
        <Typography align="center" color="primary" variant="h1">
            HOME
        </Typography>
        <Typography align="center" color="secondary" variant="subtitle2" gutterBottom>
            Never gonna give you up
        </Typography>
    </Box>
);

export default HomeTitle;