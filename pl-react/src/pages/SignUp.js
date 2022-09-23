import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { useForm } from "react-hook-form";
import { FormContainer, TextFieldElement, PasswordElement, PasswordRepeatElement } from 'react-hook-form-mui'
import { validatePassword } from "../utils/index";
import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import { ReactComponent as DiscordSvg } from "../assets/svg/discord.svg"
import SvgIcon from "@mui/material/SvgIcon";
import { useSnackbar } from 'notistack';
import LinkRouter from "../components/LinkRouter";

const DiscordIcon = () => (<SvgIcon component={DiscordSvg} inheritViewBox />)

export function SignUp() {

    const { enqueueSnackbar } = useSnackbar();
    const formContext = useForm()

    const { handleSubmit } = formContext

    const onSubmit = (data, e) => {
        console.log(data)
        inDevelopment()()
    }

    const onError = (error, e) => {
        console.log(error)
        SnackBar(`${Object.keys(error).length} errors occured.`, 'error')()

    }
    const SnackBar = (message, variant, ...props) => () => {
        enqueueSnackbar(message, {
            variant,
            ...props
        });
    };

    const inDevelopment = SnackBar("This feature is in development.", 'warning')

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
                        Sign up
                    </Typography>
                    <Box
                        sx={{ mt: 3 }}
                    >
                        <FormContainer
                            formContext={formContext}
                            handleSubmit={handleSubmit(onSubmit, onError)}
                            FormProps={{
                                'aria-autocomplete': 'none',
                                autoComplete: 'new-password'
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextFieldElement
                                        name="username"
                                        id="username"
                                        label="Username"
                                        autoFocus
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldElement
                                        id="email"
                                        type='email'
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <PasswordElement
                                        validation={
                                            {
                                                validate: (value) => validatePassword(value)
                                            }
                                        }
                                        name="password"
                                        label="Password"
                                        id="password"
                                        autoComplete="new-password"
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <PasswordRepeatElement
                                        passwordFieldName={'password'}
                                        name={'password-repeat'}
                                        margin={'dense'}
                                        label={'Repeat Password'}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>

                        </FormContainer>
                        <Divider>or</Divider>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ mt: 2, mb: 3 }}
                        >
                            <Button
                                startIcon={<GoogleIcon />}
                                fullWidth
                                variant="contained"
                                onClick={inDevelopment}
                            >
                                Google
                            </Button>
                            <Button
                                startIcon={<GitHubIcon />}
                                fullWidth
                                variant="contained"
                                onClick={inDevelopment}
                            >
                                Github
                            </Button>
                            <Button
                                startIcon={<DiscordIcon />}
                                fullWidth
                                variant="contained"
                                onClick={inDevelopment}
                            >
                                Discord
                            </Button>
                        </Stack>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <LinkRouter to="/sign-in" variant="body2">
                                    Already have an account? Sign in
                                </LinkRouter>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div >
    );
}
