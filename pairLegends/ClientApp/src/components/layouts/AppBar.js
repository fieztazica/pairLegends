import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
// import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
// import { ReactComponent as LogoSvg } from "../assets/images/logo.svg";
import { useTheme } from "@emotion/react";
import { useLocation } from "react-router";
// import { Stack } from "@mui/system";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ColorModeContext } from '../../config/color-context';
import Link from '@mui/material/Link';
// const pages = [];
// const settings = ["Logout"];


const ResponsiveAppBar = ({ user }) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const location = useLocation();
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    //console.log(location);

    const isSign = location.pathname.includes("/sign-")

    const ToggleColorMode = (
        <Tooltip title={`${theme.palette.mode === 'dark' ? "Light" : "Dark"} Mode`}>
            <IconButton size="large" edge="end" sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Tooltip>
    )

    const AvatarMenu = isSign ? <></> : (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={`${user ? "Go Further" : "Login here"}`}>
                <IconButton size="large" edge="end" sx={{ ml: 1 }} onClick={handleOpenUserMenu} color="inherit">
                    {user ? <Avatar
                        src={
                            user?.displayAvatarURL
                                ? user.displayAvatarURL
                                : "/broken-image.jpg"
                        }
                    /> : <AccountCircleIcon />}
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {user?.displayName ? (
                    <Link color="inherit" underline="none" href="/profile">
                        <MenuItem key={"profile"} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">
                                {user.displayName}
                            </Typography>
                        </MenuItem>
                    </Link>
                ) : <></>}
                <Link color="inherit" underline="none" href={`${user ? "/logout" : "/sign-in"}`}>
                    <MenuItem key={"loginout"} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                            {user ? "Logout" : "Login"}
                        </Typography>
                    </MenuItem>
                </Link>
            </Menu>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Tooltip title="Home">
                        <IconButton size="large" color="inherit" href="/">
                            <AdbIcon />
                        </IconButton>
                    </Tooltip>
                    <Box
                        sx={{ flexGrow: 1, alignSelf: 'flex-end' }}
                    />
                    {AvatarMenu}
                    {ToggleColorMode}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ResponsiveAppBar;
