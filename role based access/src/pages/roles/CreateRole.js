import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addRoleThunk } from '../../redux/actions/roleActions'
import {Box} from "@material-ui/core";
// import FormControl from '@mui/material/FormControl';
// import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { FormInputText } from '../../components/FormInputText';
import '../../components/FormStyles.css'


// const useStyles = makeStyles((theme)=>({
//     creatrole:{
//         // boxSizing: 'border-box',
//         // height:'calc(100%-60px)',
//         // position:'relative',
//         // left:'68px',
//         // width: 'calc(100% - 68px)',
//         // padding: '30px',
//         // display:'flex',
//         // justifyContent:'center',
//         // alignItems:'center' 
//         position:'relative',
//     alignItems: 'center',
//     height: 'calc(100vh - 60px)',
//     padding:'30px',
//     display: 'flex',
//     justifyContent: 'center',



//     },
//     paper:{
//         padding:'50px'
//     }
// }))

function CreateRole() {

    // const [roleName, setRoleName] = useState('')
    // const [roleCode, setRoleCode] = useState('')

    // const classes = useStyles();

    let navigate = useNavigate();

    const dispatch = useDispatch()
    let nextId = useSelector(state => state.role.nextId)

    const { handleSubmit, register, formState: { errors }, clearErrors } = useForm({mode: 'all'});

    // const createRole = () =>{
    //     dispatch(addRole({'id':'7','name':roleName,'rolecode':roleCode}))
    //     navigate('/roles')
    // }
    const onSubmit = (data,e) => {
        e.preventDefault()
        // console.log(data)
        dispatch(addRoleThunk({"id":nextId,"name":data.roleName,"rolecode":data.roleCode}))
          navigate('/roles')
      };
    return (
        // <Box className={classes.creatrole}>
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
                  CREATE ROLE
   	          </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
              <FormInputText 
                    name="roleCode"    
                    label="Role Code"
                    register = {{...register("roleCode",{required:true,minLength:1,maxLength:8, pattern:/^[a-zA-Z0-9]+$/})}}
                  />
                 {errors?.roleCode?.type === "required" && <p>Role Code is required</p>}
                 {errors?.roleCode?.type === "minLength" && (
                    <p>Role code should atleast have 1 characters</p>
                  )}
                  {errors?.roleCode?.type === "maxLength" && (
                    <p>Role Code cannot exceed 8 characters</p>
                  )}
                 {errors?.roleCode?.type === "pattern" && (
                    <p>No spaces allowed!</p>
                  )}
                <FormInputText 
                    name="roleName"    
                    label="Role Name"
                    register = {{...register("roleName",{required:true, maxLength:8, pattern:/^[a-zA-Z ]*$/})}}
                  />
                  {errors?.roleName?.type === "required" && <p>Role name is required</p>}
                  {errors?.roleName?.type === "maxLength" && (
                    <p>Role name cannot exceed 8 characters</p>
                  )}
                  {errors?.roleName?.type === "pattern" && (
                    <p>Alphabetical characters only</p>
                  )}
                
                <button>Create</button>
              </form>
            </div>
        </Box>
    )
}

export default CreateRole
