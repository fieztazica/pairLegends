import * as React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  Button,
  Toolbar,
  Typography,
  Avatar,
  Divider,
  MenuItem,
  Tooltip,
  Link,
  SvgIcon,
} from "@mui/material";
import { useLocation } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppRoutes from "../../AppRoutes";
import LinkRouter from "../LinkRouter";

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

  const excludePathname = AppRoutes.filter((route) => route.excludeAppBar).map(
    (route) => route.path
  );
  const isInExclude = excludePathname.some(
    (pathname) => pathname === location.pathname
  );

  const AvatarMenu = isInExclude ? (
    <></>
  ) : (
    <Box>
      <Tooltip title={`${user ? "Go Further" : "Login here"}`}>
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
        {user?.displayName && (
          <LinkRouter to="/profile" underline="none">
            <MenuItem key="profile" onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{user.displayName}</Typography>
            </MenuItem>
          </LinkRouter>
        )}
        <Divider />
        <LinkRouter to={`${user ? "/logout" : "/sign-in"}`} underline="none">
          <MenuItem key="loginout" onClick={handleCloseUserMenu}>
            <Typography textAlign="center">
              {user ? "Logout" : "Login"}
            </Typography>
          </MenuItem>
        </LinkRouter>
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
