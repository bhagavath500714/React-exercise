import React from 'react'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function Picker(props) {
    const { name, label, value, onChange } = props;

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker adisplayStaticWrapperAs="desktop"
          label={label}
          formate="MMM/dd/yyyy"
          value={value}
          name={name}
          onChange={date => onChange(convertToDefEventPara(name, date))}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
    )
}
