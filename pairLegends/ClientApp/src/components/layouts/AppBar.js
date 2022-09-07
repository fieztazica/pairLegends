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

    const AvatarMenu = isSign ? <></> : (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={`${user ? "Go Further" : "Login here"}`}>
                <IconButton sx={{ ml: 1 }} onClick={handleOpenUserMenu} color="inherit">
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
        <div>
            <AppBar position="static" color="primary">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            LOL
                        </Typography>

                        {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}

                        <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            LOL
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            {/* {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))} */}
                        </Box>
                        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        {AvatarMenu}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default ResponsiveAppBar;
