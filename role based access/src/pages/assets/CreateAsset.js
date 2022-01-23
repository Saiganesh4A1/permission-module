import React,{useEffect, useState} from 'react'
import './CreateAsset.css'
import {Link} from 'react-router-dom'
import { TextField, Button, Paper,Box} from "@material-ui/core";
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addAssetThunk } from '../../redux/actions/assetAction'

function CreateAsset() {


    const [encode,setEnCode] = useState('')
    const [enname,setEnName] = useState('')
    const [entype,setEnType] = useState('')
    let nextId = useSelector(state => state.asset.nextId)
    let navigate = useNavigate()
    const dispatch = useDispatch()


    const handleAssetSubmit = (event) => {
        event.preventDefault(); // added this line here to avoid this error in console :- Form submission canceled because the form is not connected
        dispatch(addAssetThunk({ 'id':nextId,  'encode':encode,'name':enname,'entype':entype}))
        navigate('/asset')
    }



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
        <Box className='create-asset'>
        <Paper  variant="outlined" elevation={8} square className="paper">
            <form className='form' onSubmit={handleAssetSubmit}>
                <h2>Add Asset</h2>
              <TextField
                onChange={e => setEnName(e.target.value)}
                value={enname}
                margin="dense"
                label={"Entity Name"}
                // helperText="give two words(for avatar) - this is temporary"
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
                   {/* onClick={handleClick}  snackbar related */}
                <Box pt={2} >
                 <center><Button  type="submit" variant="contained" color="primary" className='btn'>Add</Button></center>
                </Box>
            </form>
      
        </Paper>
      </Box>
    )
}

export default CreateAsset
