import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
}));

export default function GenderInput(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const {
        onGenderChanged } = props;

    return (
        <FormControl component="fieldset" className={classes.formControl}>
            {/* <FormLabel component="legend">Gender</FormLabel> */}
            <RadioGroup row aria-label="gender" name="gender" value={value} onChange={(e) => {
                onGenderChanged(e.target.value)
                setValue(e.target.value)
            }}>
                <FormControlLabel value="Male" control={<Radio color="default" size="small"/>} label="Male" />
                <FormControlLabel value="Female" control={<Radio color="default" size="small"/>} label="Female" />
            </RadioGroup>
        </FormControl>
    );
}
