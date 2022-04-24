import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface SnackbarAlertProps {
    isOpen: boolean,
    message: string | undefined,
    severity?: 'success' | 'info' | 'warning' | 'error',
    onClose?: () => void
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = (props) => {
    const { isOpen, message, onClose, severity } = props
    const [open, setOpen] = React.useState(isOpen);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        // onClose
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleClose}>
                            UNDO
            </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}
export default SnackbarAlert