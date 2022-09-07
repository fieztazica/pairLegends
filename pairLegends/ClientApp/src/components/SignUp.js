import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import IconButton from '@mui/material/IconButton';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as DOMLink } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { validateEmail } from "../utils/index";
import { useForm, useFormContext } from "react-hook-form";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { FormContainer, TextFieldElement, PasswordElement, PasswordRepeatElement } from 'react-hook-form-mui'

const parseError = (error) => {
    if (error.type === 'pattern') {
        return 'Enter an email'
    }
    return 'This field is required'
}

export function SignUp() {
    const [showPassword, setShowPassword] = React.useState(false)
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const form = {
        agree: false
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const inDevelopment = () => { alert("Tinh nang dang phat trien") }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
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
                            defaultValues={form}
                            onSubmit={console.log('submit')}
                            FormProps={{
                                'aria-autocomplete': 'none',
                                autoComplete: 'new-password'
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextFieldElement
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextFieldElement
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldElement
                                        required
                                        fullWidth
                                        id="email"
                                        type='email'
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        parseError={parseError}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <PasswordElement
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        id="password"
                                        autoComplete="new-password"
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
                                onClick={console.log('yo')}
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
                                fullWidth
                                variant="contained"
                                onClick={inDevelopment}
                            >
                                Google
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={inDevelopment}
                            >
                                Github
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={inDevelopment}
                            >
                                Discord
                            </Button>
                        </Stack>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <DOMLink to="/sign-in">
                                    <Link variant="body2">Already have an account? Sign in</Link>
                                </DOMLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div >
    );
}
