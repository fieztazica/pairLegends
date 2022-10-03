import * as React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuList,
  Button,
  Toolbar,
  Typography,
  Avatar,
  Divider,
  MenuItem,
  Tooltip,
  Link,
  SvgIcon,
  ListItemButton,
} from "@mui/material";
import { useLocation } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { appRoutes } from "../../AppRoutes";
import { useUser } from "../contexts/UserContext";

// const pages = [];
// const settings = ["Logout"];

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
    localStorage.clear();
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
  }, []);

  const AvatarMenu = isInExclude ? (
    <></>
  ) : (
    <Box>
      <Tooltip title={`${user ? user.userName : "Login here"}`}>
        <IconButton
          size="large"
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
            />
          ) : (
            <AccountCircleIcon />
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
              to="/profile"
              component={RouterLink}
              onClick={handleCloseUserMenu}
            >
              <Typography textAlign="center">{user.userName}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={logout} component={RouterLink}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </MenuList>
        )}
        {!user && (
          <MenuItem
            to="/sign-in"
            component={RouterLink}
            onClick={handleCloseUserMenu}
          >
            <Typography textAlign="center">Login</Typography>
          </MenuItem>
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
              <img src="favicon.png" alt="" height={32} />
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
