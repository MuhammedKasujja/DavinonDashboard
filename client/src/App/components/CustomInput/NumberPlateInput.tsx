import React from 'react'
import { TextField } from '@material-ui/core';

interface Props {
    name?: string,
    label?: string,
    error?: string,
    value?: string,
    onChange: (event: string) => void
}

const NumberPlateInput= (props:Props) => {
    const { name, label, value, error = null, onChange, ...other } = props;
    const validator = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = `${e.target.value}`
        const reg = RegExp("r'[a-zA-Z]{3}[0-9]{3}[a-zA-Z]{1}'")
        // if (reg.(value.replaceAll('-', ''))) {
        //     console.log("Yes yes yes/////////////////")
        // } else {
        //     console.log("Please use a valid Number plate")
        // }

    }


    return (
        <TextField
            variant="standard"
            label="Plate"
            name="plate"
            value={value}
            onChange={e=>{
                onChange(e.target.value)
            }}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    )
}

export default NumberPlateInput