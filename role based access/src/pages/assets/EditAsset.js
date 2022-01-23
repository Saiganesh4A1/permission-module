import React, { useState } from 'react'
import './EditAsset.css'
// import {Link} from 'react-router-dom'
import { TextField, Button, Paper, Box } from "@material-ui/core";
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import { editAssetThunk } from '../../redux/actions/assetAction'
import { useForm } from "react-hook-form";
import { FormInputText } from '../../components/FormInputText';
import '../../components/FormStyles.css'


function EditAsset() {

  // const [nextId, setNextId] = useState(targetedAsset.state.id)
  // const [encode, setEnCode] = useState(targetedAsset.state.encode)
  // const [enname, setEnName] = useState(targetedAsset.state.name)
  // const [entype, setEnType] = useState(targetedAsset.state.entype)
  const targetedAsset = useLocation()
  const [nextId] = useState(targetedAsset.state.id)

  let navigate = useNavigate()
  const dispatch = useDispatch()

  const preLoadedValues = {
    entityCode: targetedAsset.state.encode,
    name: targetedAsset.state.name,
    entityType: targetedAsset.state.entype
  }
  const { handleSubmit, register, formState: { errors }, clearErrors } = useForm({
    mode: 'all',
    defaultValues: preLoadedValues
  });


  const onSubmit = (data, event) => {
    event.preventDefault(); // added this line here to avoid this error in console :- Form submission canceled because the form is not connected
    // dispatch(editUserThunk({"id":nextId,"userId":userId,"name":userName,"userCode":userCode}))
    dispatch(editAssetThunk({ 'id': nextId, 'encode': data.entityCode, 'name': data.name, 'entype': data.EntityType }))
    navigate('/asset')
  }


  // const handleEditAssetSubmit = (event) => {
  //   event.preventDefault(); // added this line here to avoid this error in console :- Form submission canceled because the form is not connected
  //   dispatch(editAssetThunk({ 'id': nextId, 'encode': encode, 'name': enname, 'entype': entype }))
  //   navigate('/asset')
  // }



  return (
    // <div className='create-asset'>

    //     <div className="asset-entity">
    //         <form className='asset'>
    //             <h4>Create Asset</h4>
    //             <div className="form-group">
    //                 <label>Code</label>
    //                 <input type="text" className="form-control"  value={encode} placeholder="Enter entity code" onChange={ e => setEnCode(e.target.value)}/>
    //             </div>
    //             <div className="form-group">
    //                 <label>Entity Name</label>
    //                 <input type="text" className="form-control" id="enname" value={enname} placeholder="Entity Name" onChange={e => setEnName(e.target.value)}/>
    //             </div>

    //             <div className="form-group">
    //                 <label>Entity Type</label>
    //                 <input type="text" className="form-control"  id="entype" value={entype} placeholder="Entity Type" onChange={ e => setEnType(e.target.value)}/>
    //             </div>
    //             <div className='btns'>
    //                 <Link className='btn btn-success' to='/asset' onClick={handleAssetSubmit}>Create</Link>
    //             </div>
    //         </form>
    //     </div>

    // </div>
    <Box className='edit-asset'>
      {/* <Paper variant="outlined" elevation={8} square className="paper">
        <form className='form' onSubmit={handleEditAssetSubmit}>
          <h2>Edit Asset</h2>
          <TextField
            onChange={e => setEnName(e.target.value)}
            value={enname}
            margin="dense"
            label={"Entity Name"}
            helperText="give two words(for avatar) - this is temporary"
            className="textfield"
          /><br></br>
          <TextField
            onChange={e => setEnCode(e.target.value)}
            value={encode}
            margin="dense"
            label={"Entity Code"}
            className="textfield"
          /><br></br>
          <TextField
            onChange={e => setEnType(e.target.value)}
            value={entype}
            margin="dense"
            label={"Entity Type"}
            className="textfield"
          /><br></br>
          onClick={handleClick}  snackbar related
          <Box pt={2} >
            <center><Button type="submit" variant="contained" color="primary" className='btn'>Edit</Button></center>
          </Box>
        </form>

      </Paper> */}



      <div className="formC">
        <h2 className="title">
          Edit Asset
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInputText
            name="entityCode"
            label="Entity Code"
            register={{ ...register("entityCode", { required: true, minLength: 1, maxLength: 8, pattern: /^[a-zA-Z0-9]+$/ }) }}
          />
          {errors?.entityCode?.type === "required" && <p>Entity code is required</p>}
          {errors?.entityCode?.type === "minLength" && (
            <p>Entity Code should atleast have 1 characters</p>
          )}
          {errors?.entityCode?.type === "maxLength" && (
            <p>Entity Code cannot exceed 8 characters</p>
          )}
          {errors?.entityCode?.type === "pattern" && (
            <p>No spaces allowed!</p>
          )}
          <FormInputText
            name="name"
            label="Entity Name"
            register={{ ...register("name", { required: true, maxLength: 10, pattern: /^[a-zA-Z ]*$/ }) }}
          />
          {errors?.name?.type === "required" && <p>Entity name is required</p>}
          {errors?.name?.type === "maxLength" && (
            <p>Entity Name cannot exceed 10 characters</p>
          )}
          {errors?.name?.type === "pattern" && (
            <p>Alphabetical characters only</p>
          )}
          <FormInputText
            name="entityType"
            label="Entity Type"
            register={{ ...register("entityType", { required: true, maxLength: 10, pattern: /^[a-zA-Z ]*$/ }) }}
          />
          {errors?.entityType?.type === "required" && <p>Entity Type is required</p>}
          {errors?.entityType?.type === "maxLength" && (
            <p>Entity Type cannot exceed 10 characters</p>
          )}
          {errors?.entityType?.type === "pattern" && (
            <p>Alphabetical characters only</p>
          )}
          <button>Edit</button>
        </form>
      </div>
    </Box>
  )
}

export default EditAsset
