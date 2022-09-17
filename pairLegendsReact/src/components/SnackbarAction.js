import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import { closeSnackbar } from 'notistack'

export default function SnackbarAction( key) {
    return (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => closeSnackbar(key)}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    )
}