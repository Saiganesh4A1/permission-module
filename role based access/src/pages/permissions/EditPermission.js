import React,{useState} from 'react'
import { TextField, Button, Paper,Box} from "@material-ui/core";
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
// import { editRole, editRoleThunk } from '../../redux/actions/roleActions';
import {editPermissionThunk} from '../../redux/actions/permissionActions'
import { useForm } from "react-hook-form";
import { FormInputText } from '../../components/FormInputText';
import '../../components/FormStyles.css'



function EditPermission(){

    let navigate = useNavigate()
  const dispatch = useDispatch()
  const targetedPermission = useLocation()
  const [Id] = useState(targetedPermission.state.id)
  const preLoadedValues = {
    // roleCode: targetedRole.state.rolecode,
    // name: targetedRole.state.name
    permission:targetedPermission.state.permission,
    involvement:targetedPermission.state.involvement
  }
  const { handleSubmit, register, formState: { errors }, clearErrors } = useForm({
    mode: 'all',
    defaultValues: preLoadedValues
  });

    
    const onSubmit = (data, event) => {
      event.preventDefault()
      dispatch(editPermissionThunk({'id':Id,'permission':data.permission}))
      navigate('/permission')
    }

    return(
        <Box className='Box'>
        {/* <Paper  variant="outlined" elevation={3} square className={classes.paper} >
            <FormControl variant="standard">
                <h2>CREATE ROLE</h2>
            <TextField
                onChange={e => setRoleName(e.target.value)}
                value={roleName}
                margin="dense"
                label={"Role Name"}
                className="textfield"
                /><br></br>
            <TextField
                onChange={e => setRoleCode(e.target.value)}
                value={roleCode}
                margin="dense"
                label={"Role Code"}
                className="textfield"
            /><br></br>
                <Box pt={2} >
                <center><Button  type="submit" variant="contained" color="primary" className='btn' onClick={createRole}>Create</Button></center>
                </Box>
            </FormControl>
        </Paper> */}
        <div className="formC">
              <h2 className="title">
              EDIT PERMISSION
             </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
          <FormInputText 
                name="permission"    
                label="Permission"
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
            {/* <FormInputText 
                name="involvement"    
                label="INVOLVEMENT"
                register = {{...register("involvement",{required:true, maxLength:8, pattern:/^[a-zA-Z ]*$/})}}
              />
              {errors?.involvement?.type === "required" && <p>involvement is required</p>}
              {errors?.involvement?.type === "maxLength" && (
                <p>involvement cannot exceed 8 characters</p>
              )}
              {errors?.involvement?.type === "pattern" && (
                <p>Alphabetical characters only</p>
              )} */}
            
            <button>Edit</button>
          </form>
        </div>
    </Box>
    )




}

export default EditPermission