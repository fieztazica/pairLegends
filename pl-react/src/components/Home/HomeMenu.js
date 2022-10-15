import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import GroupIcon from "@mui/icons-material/Group";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { useUser } from "../contexts/UserContext";

const HomeMenu = ({ htpButtonOnClick }) => {
    const { user } = useUser()
    return (

        <ButtonGroup
            variant="contained"
            orientation="vertical"
            fullWidth
            size="large"
            sx={{
                m: 1,
                "a:hover": {
                    color: "primary.contrastText",
                }
            }}
        >
            {!user && <Button
                to="/sign-up"
                component={RouterLink}
                startIcon={<AppRegistrationIcon />}
            >
                Register
            </Button>}
            <Button to="/game" component={RouterLink} startIcon={<PlayArrowIcon />}>
                Play Game
            </Button>
            <Button
                onClick={htpButtonOnClick}
                component={Link}
                startIcon={<QuestionMarkIcon />}
            >
                How to play
            </Button>
            <Button
                rel="noreferrer"
                href="https://github.com/fiezt1492/pairLegends#readme"
                target="_blank"
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
}

export default HomeMenu