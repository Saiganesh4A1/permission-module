import React,{useState} from 'react'
import {Box} from "@material-ui/core";
import {  useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import {editUserThunk} from '../../redux/actions/userActions'
import { useForm } from "react-hook-form";
import { FormInputText } from '../../components/FormInputText';
import '../../components/FormStyles.css'

function EditUserForm() {
  let navigate = useNavigate()
    const dispatch = useDispatch()
    const targetedUser = useLocation()
    const [nextId] = useState(targetedUser.state.id)
    // const [userName, setUserName] = useState(targetedUser.state.name);
    // const [userCode, setUserCode] = useState(targetedUser.state.userCode);
    const preLoadedValues = {
      userCode: targetedUser.state.userCode,
      name: targetedUser.state.name
    }
    const { handleSubmit, register, formState: { errors }, clearErrors } = useForm({
      mode: 'all',
      defaultValues: preLoadedValues
    });
    // console.log("next id from edit----",nextId)
    
    const onSubmit = (data, event) =>{
      event.preventDefault(); // added this line here to avoid this error in console :- Form submission canceled because the form is not connected
      // dispatch(editUserThunk({"id":nextId,"userId":userId,"name":userName,"userCode":userCode}))
      dispatch(editUserThunk({"id":nextId,"name":data.name,"userCode":data.userCode}))
      navigate('/users')
  }
    return (
      <Box className='Box'>
        {/* <Paper  variant="outlined" elevation={8} square className="paper"> */}
            {/* <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <h2>Edit User</h2>
              <TextField
                onChange={e => setUserCode(e.target.value)}
                value={userCode}
                margin="dense"
                label={"User Code"}
                className="textfield"
              /><br></br>
              <TextField
                onChange={e => setUserName(e.target.value)}
                value={userName}
                margin="dense"
                label={"Name"}
                className="textfield"
              /><br></br>
              
                <Box pt={2} >
                   {/* onClick={handleClick}  snackbar related */}
                 {/* <center><Button type="submit" variant="contained" color="primary" className='btn'>Edit</Button></center> */}
                {/* </Box> */}
            {/* </form> */}
            <div className="formC">
  		        <h2 className="title">
  				      Edit User
   	          </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* <input type="text" placeholder="User Code"/> */}
                <FormInputText 
                    name="userCode"    
                    label="User Code"
                    register = {{...register("userCode",{required:true,minLength:1, maxLength:8, pattern:/^[a-zA-Z0-9]+$/})}}
                  />
                  {errors?.userCode?.type === "required" && <p>This field is required</p>}
                  {errors?.userCode?.type === "minLength" && (
                    <p>User Code should atleast have 1 characters</p>
                  )}
                  {errors?.userCode?.type === "maxLength" && (
                    <p>User Code cannot exceed 8 characters</p>
                  )}
                  {errors?.userCode?.type === "pattern" && (
                    <p>No spaces allowed!</p>
                  )}
                {/* <input type="text" placeholder="Name"/> */}
                <FormInputText 
                    name="name"    
                    label="Name"
                    register = {{...register("name",{required:true,maxLength:8, pattern:/^[a-zA-Z ]*$/})}}
                  />
                 {errors?.name?.type === "required" && <p>This field is required</p>}
                  {errors?.name?.type === "maxLength" && (
                    <p>User Name cannot exceed 8 characters</p>
                  )}
                 {errors?.name?.type === "pattern" && (
                    <p>Alphabetical characters only</p>
                  )}
                <button>Edit</button>
              </form>
            </div>

        {/* </Paper> */}
      </Box>
    )
}

export default EditUserForm
// id, user-id, name, user-code