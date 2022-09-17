import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useLocation } from "react-router";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from '@mui/material/Link';
import { Link as DOMLink } from "react-router-dom";
import { ReactComponent as LoLSvg } from "../../assets/svg/lol.svg"
import SvgIcon from "@mui/material/SvgIcon";
import AppRoutes from '../../AppRoutes'
// const pages = [];
// const settings = ["Logout"];

const ResponsiveAppBar = ({ user }) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const location = useLocation();

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

    const excludePathname = AppRoutes.filter(route => route.excludeAppBar).map(route => route.path)
    const isInExclude = excludePathname.some(pathname => pathname === location.pathname)

    const AvatarMenu = isInExclude ? <></> : (
        <Box>
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
                    <DOMLink to="/profile" style={{ textDecoration: 'none' }}>
                        <Link color="inherit" underline="none" >
                            <MenuItem key={"profile"} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">
                                    {user.displayName}
                                </Typography>
                            </MenuItem>
                        </Link>
                    </DOMLink>
                ) : <></>}
                <DOMLink to={`${user ? "/logout" : "/sign-in"}`} style={{ textDecoration: 'none' }}>
                    <Link color="inherit" underline="none">
                        <MenuItem key={"loginout"} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">
                                {user ? "Logout" : "Login"}
                            </Typography>
                        </MenuItem>
                    </Link>
                </DOMLink>

            </Menu>
        </Box>
    );

    return (
        <Box>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Tooltip title="Home">
                        <IconButton size="small" color="inherit" href="/">
                            <SvgIcon fontSize="large" component={LoLSvg} inheritViewBox />
                        </IconButton>
                    </Tooltip>
                    <Typography
                        ml={2}
                        variant="h5"
                        component="a"
                        href="/"
                        color="inherit"
                        sx={{
                            '&:hover': {
                                color: 'inherit',
                                backgroundColor: "transparent",
                                textShadow: "2px 2px 3px black",
                                transitionDuration: "0.4s"
                            },
                            textDecoration: 'none',
                        }}>
                        Pair Legends
                    </Typography>
                    <Box
                        sx={{ flexGrow: 1, alignSelf: 'flex-end' }}
                    />
                    {AvatarMenu}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ResponsiveAppBar;
