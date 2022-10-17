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
        fetchUser();
        if (user) {
            const localLastGame = localStorage.getItem("lastGame");
            if (localLastGame) {
                let lastGame = { ...(JSON.parse(localLastGame)) }
                lastGame.id = user?.id
                SnackBar(`Found a game in your local storage!`, "warning")();
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

        }
    }, [])

    return children;
}

export default PreloadLayout;