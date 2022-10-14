import * as React from "react";
import { useUser } from "../components/contexts/UserContext";
import {
  Avatar,
  Button,
  Grid,
  Box,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  Badge,
} from "@mui/material";
import OverviewTab from "../components/Profile/OverviewTab";
import PasswordTab from "../components/Profile/PasswordTab";
import { useSnackbar } from "notistack";

export function Profile() {
  const { user, fetchUser } = useUser();
  const [tabIndex, setTabIndex] = React.useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const SnackBar =
    (message, variant, ...props) =>
    () => {
      enqueueSnackbar(message, {
        variant,
        ...props,
      });
    };

  const onTabSelect = (event, newValue) => {
    setTabIndex(newValue);
  };

  React.useEffect(() => {
    if (!user) fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Grid container spacing={2} direction="row" p={2}>
        <Grid
          item
          container
          xs="auto"
          spacing={1}
          direction="column"
          alignItems="center"
        >
          <Grid item xs>
            <Badge
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              color="secondary"
              badgeContent={`${user?.roles.join(", ")}`}
              invisible={user?.roles.length <= 0}
            >
              <Avatar
                src={
                  user?.displayAvatarURL
                    ? user.displayAvatarURL
                    : "/broken-image.jpg"
                }
                sx={{ width: 96, height: 96 }}
                alt={user?.userName.toUpperCase()}
              />
            </Badge>
          </Grid>
          <Grid item xs>
            <Tooltip placement="right" arrow title={user?.id}>
              <Button
                variant="h4"
                onClick={() => {
                  navigator.clipboard.writeText(`${user?.id}`);
                  SnackBar(`Copied ${user?.id} to clipboard!`, "success")();
                }}
                component={Typography}
              >
                {user?.userName}
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs>
            <Tabs
              orientation="vertical"
              value={tabIndex}
              onChange={onTabSelect}
            >
              <Tab label="Overview" />
              <Tab label="Password" />
            </Tabs>
          </Grid>
        </Grid>
        <Grid item xs>
          {tabIndex === 0 && <OverviewTab user={user} />}
          {tabIndex === 1 && <PasswordTab user={user} />}
        </Grid>
      </Grid>
    </Box>
  );
}
