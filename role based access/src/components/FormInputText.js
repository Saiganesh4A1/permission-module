// import TextField from "@material-ui/core/TextField";
// import { Controller } from "react-hook-form";
import React from "react";

export const FormInputText = ({ name,  label, register}) => {
  return (
    // <TextField 
    //   name={name }   
    //   label={label}
    //   // {...register("name",{required:"Required"})}
    //   {...register}
    //   margin="dense"
    //   variant="outlined"
    //   autoComplete="off"
    // />
    <input type="text" name={name} placeholder={label} {...register} autoComplete="off"/>
  )
    }