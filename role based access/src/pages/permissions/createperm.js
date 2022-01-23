import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { addRoleThunk } from '../../redux/actions/roleActions'
import {addPermissionThunk} from '../../redux/actions/permissionActions'
import {Box} from "@material-ui/core";
// import FormControl from '@mui/material/FormControl';
// import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { FormInputText } from '../../components/FormInputText';
import '../../components/FormStyles.css'



function Createperm(){

    let navigate = useNavigate();

    const dispatch = useDispatch()
    let nextId = useSelector(state => state.permissionroot.nextId)

    const { handleSubmit, register, formState: { errors }, clearErrors } = useForm({mode: 'all'});

    // const createRole = () =>{
    //     dispatch(addRole({'id':'7','name':roleName,'rolecode':roleCode}))
    //     navigate('/roles')
    // }
    const onSubmit = (data,e) => {
        e.preventDefault()
        // console.log(data)
        dispatch(addPermissionThunk({"id":nextId,"permission":data.permission,"involvement":data.involvement}))
        //   navigate('/roles')
        navigate('/permission')
      };
    return (
        // <Box className={classes.creatrole}>
        <Box className='Box'>
            <div className="formC">
  		        <h2 className="title">
                  CREATE PERMISSION
   	          </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
              <FormInputText 
                    name="permission"    
                    label="PERMISSION"
                    register = {{...register("permission",{required:true,minLength:1,maxLength:8, pattern:/^[a-zA-Z0-9]+$/})}}
                  />
                 {errors?.permission?.type === "required" && <p>Permission is required</p>}
                 {errors?.permission?.type === "minLength" && (
                    <p>Permission should atleast have 1 characters</p>
                  )}
                  {errors?.permission?.type === "maxLength" && (
                    <p>Permission cannot exceed 8 characters</p>
                  )}
                 {errors?.permission?.type === "pattern" && (
                    <p>No spaces allowed!</p>
                  )}
                <FormInputText 
                    name="involvement"    
                    label="Involvement"
                    register = {{...register("involvement",{required:true, maxLength:8, pattern:/^[a-zA-Z ]*$/})}}
                  />
                  {errors?.involvement?.type === "required" && <p>Involvement is required</p>}
                  {errors?.involvement?.type === "maxLength" && (
                    <p>involvement cannot exceed 8 characters</p>
                  )}
                  {errors?.involvement?.type === "pattern" && (
                    <p>Alphabetical characters only</p>
                  )}
                
                <button>Create</button>
              </form>
            </div>
        </Box>
    )
}


export default Createperm