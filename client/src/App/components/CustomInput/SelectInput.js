import React, { Fragment } from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography"
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/customInputStyle";
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(styles);

export default function SelectInput(props) {
    const classes = useStyles();
    const {
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        error,
        success,
        value,
        handleChange,
        items
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
        <Fragment>
            <FormControl
                {...formControlProps}
                className={formControlProps.className + " " + classes.formControl}
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
                <Select
                    classes={{
                        root: marginTop,
                        disabled: classes.disabled
                    }}
                    labelId={id}
                    id={id}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    {...inputProps}
                >{items}</Select>
                {error ? (
                    <Clear className={classes.feedback + " " + classes.labelRootError} />
                ) : success ? (
                    <Check className={classes.feedback + " " + classes.labelRootSuccess} />
                ) : null}
            </FormControl>
        </Fragment>
    );
}