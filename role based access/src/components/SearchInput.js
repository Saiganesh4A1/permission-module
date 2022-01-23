import React from 'react'
import TextField from '@mui/material/TextField';

function SearchInput({name, label, value,error=null, onChange, ...other }) {
    return (
        <TextField 
        variant="outlined"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...other}
        {...(error && {error:true,helperText:error})}
        />
    )
}

export default SearchInput
