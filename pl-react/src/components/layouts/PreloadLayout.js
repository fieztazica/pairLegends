import * as React from "react";
import { useUser } from "../contexts/UserContext";
import { useSnackbar } from "notistack";
import { postMatch } from "../../utils/api";

const PreloadLayout = ({ children }) => {
    const { user, fetchUser } = useUser();
    const { enqueueSnackbar } = useSnackbar();

    const SnackBar =
        (message, variant, ...props) =>
            () => {
                enqueueSnackbar(message, {
                    variant,
                    ...props,
                });
            };

    React.useEffect(() => {
        if (!user) fetchUser();
        if (user && localStorage.getItem("lastGame")) {
            let lastGame = { ...(JSON.parse(localStorage.getItem("lastGame"))) }
            lastGame.id = user?.id
            SnackBar(`Found a game in your local storage!`, "info")();
            postMatch(JSON.stringify(lastGame))
                .then((data) => {
                    localStorage.removeItem("lastGame");
                    SnackBar(`Saved your last game to cloud!`, "success")();
                })
                .catch((err) => {
                    SnackBar(`${err.message}`, "error")();
                    console.error(err.message);
                });
        }
    }, [user])

    return children;
}

export default PreloadLayout;