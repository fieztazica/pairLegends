import * as React from "react";
import {
    AppBar,
    Box,
    IconButton,
    Menu,
    MenuList,
    Toolbar,
    Typography,
    Avatar,
    Divider,
    MenuItem,
    Tooltip,
    Link,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useLocation } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { appRoutes } from "../../AppRoutes";
import { useUser } from "../contexts/UserContext";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

const ResponsiveAppBar = () => {
    const { user, fetchUser } = useUser();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const location = useLocation();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        localStorage.removeItem("jwtToken");
        window.location.href = "/";
    };

    const excludePathname = appRoutes
        .filter((route) => route.excludeAppBar)
        .map((route) => route.path);
    const isInExclude = excludePathname.some(
        (pathname) => pathname === location.pathname
    );

    React.useEffect(() => {
        if (!user) fetchUser();
        // eslint-disable-next-line
    }, [user]);

    const AvatarMenu = isInExclude ? (
        <></>
    ) : (
        <Box>
            <Tooltip
                placement="left"
                arrow
                title={`${user ? user.userName : "Login here"}`}
            >
                <IconButton
                    edge="end"
                    sx={{ ml: 1 }}
                    onClick={handleOpenUserMenu}
                    color="inherit"
                >
                    {user ? (
                        <Avatar
                            src={
                                user?.displayAvatarURL
                                    ? user.displayAvatarURL
                                    : "/broken-image.jpg"
                            }
                            alt={user.userName.toUpperCase()}
                        />
                    ) : (
                        <AccountCircleIcon fontSize="large" />
                    )}
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
                {user && (
                    <MenuList>
                        <MenuItem
                            to={`/profile`}
                            component={RouterLink}
                            onClick={handleCloseUserMenu}
                        >
                            <ListItemIcon>
                                <PersonIcon color="secondary" />
                            </ListItemIcon>
                            <ListItemText>{user.userName}</ListItemText>
                        </MenuItem>
                        <MenuItem
                            to="/history"
                            component={RouterLink}
                            onClick={handleCloseUserMenu}
                        >
                            <ListItemIcon>
                                <HistoryIcon />
                            </ListItemIcon>
                            <ListItemText>History</ListItemText>
                        </MenuItem>
                        <Divider variant="middle" component="li" />
                        <MenuItem onClick={logout} component={RouterLink}>
                            <ListItemIcon>
                                <LogoutIcon color="error" />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                    </MenuList>
                )}
                {!user && (
                    <MenuList>
                        <MenuItem
                            to="/sign-in"
                            component={RouterLink}
                            onClick={handleCloseUserMenu}
                        >
                            <ListItemIcon>
                                <LoginIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText>Login</ListItemText>
                        </MenuItem>
                    </MenuList>
                )}
            </Menu>
        </Box>
    );

    return (
        <Box>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Tooltip title="Home">
                        <IconButton size="small" color="inherit" href="/">
                            <img src="/favicon.png" alt="" height={32} />
                        </IconButton>
                    </Tooltip>
                    <Typography
                        ml={1}
                        variant="h5"
                        component={Link}
                        href="/"
                        color="inherit"
                        underline="none"
                        sx={{
                            transitionDuration: "0.4s",
                            "&:hover": {
                                color: "primary.contrastText",
                                textShadow: "2px 2px 3px black",
                            },
                        }}
                    >
                        Pair Legends
                    </Typography>
                    <Box sx={{ flexGrow: 1, alignSelf: "flex-end" }} />
                    {AvatarMenu}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ResponsiveAppBar;
