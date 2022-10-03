import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
  CheckboxElement,
} from "react-hook-form-mui";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import LinkRouter from "../components/LinkRouter";
import { useUser } from "../components/contexts/UserContext";

export function SignIn() {
  const { user, fetchUser } = useUser();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const formContext = useForm();
  const [loading, setLoading] = React.useState(false);

  const { handleSubmit } = formContext;

  const onSubmit = (submit, e) => {
    setLoading(true);
    const signInModel = {
      email: `${submit.email}`,
      password: `${submit.password}`,
      rememberMe: submit.remember,
    };

    const fetchData = async () => {
      const response = await fetch("api/user/authenticate", {
        body: JSON.stringify(signInModel),
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) throw new Error(response.statusText);

      const data = await response.json();
      if (data.succeeded) return data;
      else throw new Error(data.message);
    };

    fetchData()
      .then((data) => {
        setLoading(false);
        SnackBar("Signed you in!", "success");
        localStorage.setItem("jwtToken", data.resultObject);
        fetchUser();
        window.location.href = "/";
        // navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        SnackBar(`${err.message}`, "error")();
        console.error(err.message);
      });
  };

  const onError = (error, e) => {
    console.log(error);
    SnackBar(`${Object.keys(error).length} errors occured.`, "error")();
  };

  const ForgotPwdFunc = () => {
    SnackBar("Who know?", "info")();
  };

  const SnackBar =
    (message, variant, ...props) =>
    () => {
      enqueueSnackbar(message, {
        variant,
        ...props,
      });
    };

  const inDevelopment = SnackBar("This feature is in development.", "warning");

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <FormContainer
              formContext={formContext}
              handleSubmit={handleSubmit(onSubmit, onError)}
              FormProps={{
                "aria-autocomplete": "none",
              }}
            >
              <TextFieldElement
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <PasswordElement
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
              />
              <CheckboxElement name="remember" label="Remember me" />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
                loadingIndicator="Signing you in..."
              >
                Sign In
              </LoadingButton>
            </FormContainer>
            <Grid container>
              <Grid item xs>
                <Link
                  component="button"
                  href=""
                  variant="body2"
                  onClick={inDevelopment}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <LinkRouter to="/sign-up" variant="body2">
                  Don't have an account? Sign Up
                </LinkRouter>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
