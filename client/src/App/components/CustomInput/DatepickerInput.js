import React, { Fragment, useState } from "react";
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import format from "date-fns/format";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export default function DatepickerInput(props) {
    const [selectedDate, handleDateChange] = useState(new Date());
    const { onDateChanged } = props

    return (
        <Fragment>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    disableFuture
                    // openTo="year"
                    format="dd/MM/yyyy"
                    // variant="inline"
                    label="Date of birth"
                    // views={["year", "month", "date"]}
                    value={selectedDate}
                    onChange={(date) => {
                        handleDateChange(date)
                        onDateChanged(format(date, "dd/MM/yyyy"))
                    }}
                />
            </MuiPickersUtilsProvider>
        </Fragment>

    );
}

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';

// const useStyles = makeStyles((theme) => ({
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     textField: {
//         marginLeft: theme.spacing(1),
//         marginRight: theme.spacing(1),
//         // width: 300,
//     },
// }));

// export default function DatepickerInput(props) {
//     const classes = useStyles();
//     const {
//         onDateChanged
//     } = props;

//     return (
//         <form className={classes.container} noValidate>
//             <TextField
//                 onChange={(e) => {
//                     onDateChanged(e.target.value)
//                 }}
//                 id="date"
//                 label="Birthday"
//                 type="date"
//                 fullWidth={true}
//                 // defaultValue="2017-05-24"
//                 className={classes.textField}
//                 InputLabelProps={{
//                     shrink: true,
//                 }}
//             />
//         </form>
//     );
// }
