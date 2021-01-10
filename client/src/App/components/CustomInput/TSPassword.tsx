import React from 'react'
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField'

/**
 * Extend properties
 */
export interface PasswordProps extends StandardTextFieldProps {
    custom: string
}

/**
 * Password input
 * @param props Properties
 */
export const PasswordField: React.FunctionComponent<PasswordProps> = (props) => {
    props = Object.assign({ type: 'password' }, props)
    return (
        <TextField {...props}>
            {props.children}
        </TextField>
    )
}