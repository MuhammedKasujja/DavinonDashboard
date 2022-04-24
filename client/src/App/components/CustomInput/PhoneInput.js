import React, { Fragment } from "react"
import MaterialUiPhoneNumber from "material-ui-phone-number"
import FormControl from "@material-ui/core/FormControl";
import styles from "../../assets/jss/material-dashboard-react/components/customInputStyle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

export default function PhoneInput(props) {
    const classes = useStyles();
    const {
        id,
        labelProps,
        error,
        success,
        onChange,
        inputProps
    } = props;

    const formControlProps = {
        fullWidth: true
    }
    return (
        <Fragment>
        <FormControl {...formControlProps}
            className={formControlProps.className + " " + classes.formControl}>
            <MaterialUiPhoneNumber
                label="Telephone"
                defaultCountry="ug"
                onlyCountries={['ug']}
                autoFormat
                countryCodeEditable={false}
                preferredCountries={['ug']}
                onChange={(e) => {
                    onChange(e)
                }}
                disableDropdown
                inputProps={inputProps}
            />
        </FormControl>
        </Fragment>
    )
}