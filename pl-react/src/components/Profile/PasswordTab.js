import * as React from "react";
import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import {
  FormContainer,
  PasswordElement,
  PasswordRepeatElement,
} from "react-hook-form-mui";
import { changePassword } from "../../utils/api";
import { validatePassword } from "../../utils";

export default function PasswordTab({ user }) {
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
    const changePasswordModel = JSON.stringify({
      id: `${user?.id}`,
      currentPassword: `${submit["password"]}`,
      newPassword: `${submit["new-password"]}`,
    });

    changePassword(changePasswordModel)
      .then((data) => {
        setLoading(false);
        SnackBar(`Successfully updated your password!`, "success")();
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
        <PasswordElement
          validation={{
            validate: (value) => validatePassword(value),
          }}
          name="new-password"
          label="New Password"
          id="new-password"
          autoComplete="new-password"
          required
          fullWidth
        />
        <PasswordRepeatElement
          passwordFieldName="new-password"
          name="password-repeat"
          margin="dense"
          label="Repeat New Password"
          required
          fullWidth
        />
        <PasswordElement
          name="password"
          label="Current Password"
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
          loadingIndicator="Updating your password..."
        >
          Save
        </LoadingButton>
      </Stack>
    </FormContainer>
  );
}
