import React from 'react';
import classNames from "classnames";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import styles from "../../assets/jss/material-dashboard-react/components/customInputStyle";
const useStyles = makeStyles(styles);

export default function AutocompleteInput(props) {
    const classes = useStyles();
    const {
        formControlProps,
        labelText,
        id,
        options,
        handleChange,
        getLabel,
        value,
        inputProps
    } = props;
    const marginTop = classNames({
        [classes.marginTop]: labelText === undefined
    });
    // console.log({ "options": options })
    return (
        <FormControl
            {...formControlProps}
            className={formControlProps.className + " " + classes.formControl}
        >
            <Autocomplete classes={{
                root: marginTop,
            }}
                onChange={(event, val, reason) => {
                    if (val)
                        handleChange(val)
                }}
                id={id}
                inputValue={value}
                options={options}
                getOptionLabel={(option) => getLabel(option)}
                renderInput={(params) => <TextField {...params} label={labelText} />}
                {...inputProps}
            />
        </FormControl>
    );
}