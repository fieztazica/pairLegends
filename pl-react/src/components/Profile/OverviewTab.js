import * as React from "react";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { FormContainer, TextFieldElement, PasswordElement } from "react-hook-form-mui";
import { updateUser } from "../../utils/api";

export default function OverviewTab({ user }) {
    const [loading, setLoading] = React.useState(false);
    const formContext = useForm({
        defaultValues: {
            username: `${user?.userName}`,
            email: `${user?.email}`,
        },
    });
    const { enqueueSnackbar } = useSnackbar();

    const { handleSubmit } = formContext;

    const onSubmit = (submit, e) => {
        setLoading(true);
        const updateUserModel = JSON.stringify({
            id: `${user?.id}`,
            userName: `${submit.username === user.userName ? "" : submit.username}`,
            email: `${submit.email === user.email ? "" : submit.email}`,
            password: `${submit.password || ""}`,
        });

        updateUser(updateUserModel)
            .then((data) => {
                setLoading(false);
                SnackBar(`Success! Relogin to get update!`, "success")();
            })
            .catch((err) => {
                setLoading(false);
                SnackBar(`${err.message}`, "error")();
                console.error(err.message);
            });
        console.log(submit);
    };

    const onError = (error, e) => {
        console.error(error);
        SnackBar(`${Object.keys(error).length} errors occured.`, "error")();
    };

    const SnackBar =
        (message, variant, ...props) =>
            () => {
                enqueueSnackbar(message, {
                    variant,
                    ...props,
                });
            };

    return (
        <FormContainer
            formContext={formContext}
            handleSubmit={handleSubmit(onSubmit, onError)}
            FormProps={{
                "aria-autocomplete": "none",
            }}
        >
            <Stack spacing={2}>
                <TextFieldElement
                    required
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    placeholder={`${user?.userName}`}
                />
                <TextFieldElement
                    required
                    fullWidth
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    placeholder={`${user?.email}`}
                />
                <PasswordElement
                    name="password"
                    label="Password"
                    id="password"
                    autoComplete="current-password"
                    required
                    fullWidth
                />
                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    loading={loading}
                    loadingIndicator="Updating your profile..."
                >
                    Save
                </LoadingButton>
            </Stack>
        </FormContainer>
    );
}
