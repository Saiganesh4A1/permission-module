import React from 'react'
import {Box} from "@material-ui/core";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {addUserThunk} from '../../redux/actions/userActions'
import { useForm } from "react-hook-form";
import { FormInputText } from '../../components/FormInputText';
import '../../components/FormStyles.css'


// const defaultValues = {
//   userName:"",
//   userCode:""
// };
function AddUserForm() {
    // const [userId, setUserId] = useState("");
    // const [userName, setUserName] = useState("");
    // const [userCode, setUserCode] = useState("");
    let navigate = useNavigate()
    const dispatch = useDispatch()
    // const [textValue, setTextValue] = useState("");
    const { handleSubmit, register, formState: { errors }, clearErrors } = useForm({mode: 'all'});
    let nextId = useSelector(state => state.users.nextId)

  //   const createUser = (event) =>{
  //     event.preventDefault(); // added this line here to avoid this error in console :- Form submission canceled because the form is not connected
  //     dispatch(addUserThunk({"id":nextId,"userId":userId,"name":userName,"userCode":userCode}))
  //     navigate('/users')
  // }
  // const onTextChange = (e) => setTextValue(e.target.value);
  const onSubmit = (data,e) => {
    e.preventDefault()
    console.log(data)
    dispatch(addUserThunk({"id":nextId,"name":data.name,"userCode":data.userCode}))
      navigate('/users')
  };
    return (
      // <Box className='createUser'>
      //   <Paper  variant="outlined" elevation={8} square className="paper">
      //       <form className='form' onSubmit={createUser}>
      //           <h2>Add User</h2>
      //         <TextField
      //           onChange={e => setUserId(e.target.value)}
      //           value={userId}
      //           margin="dense"
      //           label={"User Id"}
      //           className="textfield"
      //           /><br></br>
      //         <TextField
      //           onChange={e => setUserName(e.target.value)}
      //           value={userName}
      //           margin="dense"
      //           label={"Name"}
      //           // helperText="give two words(for avatar) - this is temporary"
      //           className="textfield"
      //         /><br></br>
      //         <TextField
      //           onChange={e => setUserCode(e.target.value)}
      //           value={userCode}
      //           margin="dense"
      //           label={"User Code"}
      //           className="textfield"
      //         /><br></br>
      //              {/* onClick={handleClick}  snackbar related */}
      //           <Box pt={2} >
      //            <center><Button  type="submit" variant="contained" color="primary" className='btn'>Add</Button></center>
      //           </Box>
      //       </form>
      
      //   </Paper>
      // </Box>
      <Box className='Box'>
        {/* <Paper  variant="outlined" elevation={8} square className="paper"> */}
            {/* <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <h2>Add User</h2>
                
                <FormInputText 
                    name="userCode"    
                    label="User Code"
                    register = {{...register("userCode",{required:true,minLength:1, maxLength:5, pattern:/^[a-zA-Z0-9]+$/})}}
                  />
                  {errors?.userCode?.type === "required" && <p>This field is required</p>}
                  {errors?.userCode?.type === "minLength" && (
                    <p>User Code should atleast have 2 characters</p>
                  )}
                  {errors?.userCode?.type === "maxLength" && (
                    <p>User Code cannot exceed 5 characters</p>
                  )}
                  {errors?.userCode?.type === "pattern" && (
                    <p>No spaces allowed!</p>
                  )}
                  <br></br>
                  <FormInputText 
                    name="name"    
                    label="Name"
                    register = {{...register("name",{required:true,maxLength:8, pattern:/^[a-zA-Z ]*$/, onBlur: () => clearErrors("name")})}}
                  />
                 {errors?.name?.type === "required" && <p>This field is required</p>}
                  {errors?.name?.type === "maxLength" && (
                    <p>User Name cannot exceed 8 characters</p>
                  )}
                 {errors?.name?.type === "pattern" && (
                    <p>Alphabetical characters only</p>
                  )}
                <Box pt={2} mt={3}>
                 <center><Button  type="submit" variant="contained" color="primary" className='btn'>Add</Button></center>
                </Box>
            </form> */}
            <div className="formC">
  		        <h2 className="title">
  				      Add User
   	          </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* <input type="text" placeholder="User Code"/> */}
                <FormInputText 
                    name="userCode"    
                    label="User Code"
                    register = {{...register("userCode",{required:true,minLength:1, maxLength:8, pattern:/^[a-zA-Z0-9]+$/})}}
                  />
                  {errors?.userCode?.type === "required" && <p>User Code is required</p>}
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
                    // onBlur: () => clearErrors("name")
                    register = {{...register("name",{required:true,maxLength:8, pattern:/^[a-zA-Z ]*$/})}}
                  />
                 {errors?.name?.type === "required" && <p>Name is required</p>}
                  {errors?.name?.type === "maxLength" && (
                    <p>User Name cannot exceed 8 characters</p>
                  )}
                 {errors?.name?.type === "pattern" && (
                    <p>Alphabetical characters only</p>
                  )}
                <button>Add</button>
              </form>
            </div>
        {/* </Paper> */}
      </Box>
    )
}

export default AddUserForm
// id, user-id, name, user-code