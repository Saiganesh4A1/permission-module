import React,{useState} from 'react'
import { TextField, Button, Paper,Box} from "@material-ui/core";
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import { editRole, editRoleThunk } from '../../redux/actions/roleActions';
import { useForm } from "react-hook-form";
import { FormInputText } from '../../components/FormInputText';
import '../../components/FormStyles.css'

function EditRole() {

  let navigate = useNavigate()
  const dispatch = useDispatch()
  const targetedRole = useLocation()
  const [Id] = useState(targetedRole.state.id)
  const preLoadedValues = {
    roleCode: targetedRole.state.rolecode,
    name: targetedRole.state.name
  }
  const { handleSubmit, register, formState: { errors }, clearErrors } = useForm({
    mode: 'all',
    defaultValues: preLoadedValues
  });

    
    const onSubmit = (data, event) => {
      event.preventDefault()
      dispatch(editRoleThunk({'id':Id,'name':data.name,"rolecode":data.roleCode}))
      navigate('/roles')
    }


    return (
        <Box className="Box">
        <div className="formC">
  		        <h2 className="title">
                Edit Role
   	          </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormInputText 
                    name="roleCode"    
                    label="Role Code"
                    register = {{...register("roleCode",{required:true,minLength:1, maxLength:8, pattern:/^[a-zA-Z0-9]+$/})}}
                  />
                  {errors?.roleCode?.type === "required" && <p>Role code is required</p>}
                  {errors?.roleCode?.type === "minLength" && (
                    <p>Role Code should atleast have 1 characters</p>
                  )}
                  {errors?.roleCode?.type === "maxLength" && (
                    <p>Role Code cannot exceed 8 characters</p>
                  )}
                  {errors?.roleCode?.type === "pattern" && (
                    <p>No spaces allowed!</p>
                  )}
                <FormInputText 
                    name="name"    
                    label="Role name"
                    register = {{...register("name",{required:true,maxLength:10, pattern:/^[a-zA-Z ]*$/})}}
                  />
                 {errors?.name?.type === "required" && <p>Role name is required</p>}
                  {errors?.name?.type === "maxLength" && (
                    <p>Role Name cannot exceed 10 characters</p>
                  )}
                 {errors?.name?.type === "pattern" && (
                    <p>Alphabetical characters only</p>
                  )}
                <button>Edit</button>
              </form>
            </div>
      </Box>
    )
}

export default EditRole
