import React, { Fragment } from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import InputLabel, { InputLabelProps } from "@material-ui/core/InputLabel";
import Input, { InputProps } from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/customInputStyle";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);

export interface CustomInputProps {
    formControlProps: FormControlProps
    labelText: string,
    id?: string,
    labelProps?: InputLabelProps,
    inputProps?: InputProps,
    error?: boolean,
    success?: boolean,
    handleChange: (value: string) => void
}

export default function CustomInputText(props: CustomInputProps) {
    const classes = useStyles();
    const {
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        error,
        success,
        handleChange
    } = props;

    const labelClasses = classNames({
        [" " + classes.labelRootError]: error,
        [" " + classes.labelRootSuccess]: success && !error
    });
    const underlineClasses = classNames({
        [classes.underlineError]: error,
        [classes.underlineSuccess]: success && !error,
        [classes.underline]: true
    });
    const marginTop = classNames({
        [classes.marginTop]: labelText === undefined
    });
    return (
        <div>
            {/* <Typography className={classes.labelRoot + labelClasses}>{labelText}</Typography> */}
            <FormControl
                {...formControlProps}
                className={formControlProps.className + " " + classes.formControl}
                // variant="outlined"
            >
                {labelText !== undefined ? (
                    <InputLabel
                        className={classes.labelRoot + labelClasses}
                        htmlFor={id}
                        {...labelProps}
                    >
                        {labelText}
                    </InputLabel>
                ) : null}
                <Input onChange={(e) => handleChange(e.target.value)}
                    classes={{
                        root: marginTop,
                        disabled: classes.disabled,
                        underline: underlineClasses
                    }}
                    id={id}
                    // variant="outlined"
                    {...inputProps}
                />
                {error ? (
                    <Clear className={classes.feedback + " " + classes.labelRootError} />
                ) : success ? (
                    <Check className={classes.feedback + " " + classes.labelRootSuccess} />
                ) : null}
            </FormControl>
        </div>
    );
}

