import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Alert from '@material-ui/lab/Alert'
import React from 'react'
import CloseIcon from '@material-ui/icons/Close';

export interface CustomAlertProps {
    isOpen: boolean,
    message: string | undefined,
    severity: 'success' | 'info' | 'warning' | 'error',
    onClose?: () => void
}

const CustomAlert: React.FC<CustomAlertProps> = (props) => {
    const { isOpen, severity, message, onClose, ...rest } = props
   
    return <Collapse in={isOpen}>
        <Alert
            severity={severity}
            {...rest}
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={onClose}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
        >
            {message}
        </Alert>
    </Collapse>
}

export default CustomAlert