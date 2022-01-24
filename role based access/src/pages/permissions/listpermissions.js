import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { deleteRoleThunk } from '../../redux/actions/roleActions'
import {deletePermissionThunk} from '../../redux/actions/permissionActions';
import MTable from '../../components/MTable'
import { makeStyles } from '@material-ui/core/styles';
import PermissionCard from '../../components/PermissionCard';
// import UserCard from '../../components/UserCard'


const useStyles = makeStyles((theme)=>({
  listroles:{
      boxSizing: 'border-box',
      height:'calc(100vh-60px)',
      position:'relative',
      left:'68px',
      width: 'calc(100% - 68px)',
      padding: '30px'
  }
}))

// let roleDetail ={}

let permissionDetails = {}

function ListRoles() {

  
//   const roles = useSelector(state => state.role.roles)

const permisssions = useSelector(state=>state.permissionroot.permissiondata)


  const dispatch = useDispatch()
  const toogleState = useSelector(state => state.toogle.toogleState)
  const classes = useStyles();
  let navigate = useNavigate()

//   const [open, setOpen] = useState(false);

// const columns=[{id:'permission',label:'Permission'},{id:'involvement',label:'Involvement'}] -- remove ,{id:'involvement',label:'Involvement'} part from this
  
  const columns=[{id:'permission',label:'Permission'}] // id:'permission' -->name is a dummy data column id of permreducer

    useEffect(() => {
        let cls=document.getElementsByClassName('roles')[0];
        if(toogleState){
            cls.style.left="260px";
            cls.style.transition="all 0.4s ease";
            cls.style.width="calc(100% - 260px)";
        }
        if(!toogleState){
            cls.style.left="68px"
            cls.style.width="calc(100% - 68px)";
        }
        
    }, [toogleState])

    // const handleOpenModal = (role) =>{
    //   roleDetail=role;
    //   setOpen(true);
    // }

    const [open, setOpen] = useState(false);

    const handleOpenModal = (permission) =>{
      permissionDetails=permission;
      setOpen(true);
    }

    const handleCloseModal = () =>{
      setOpen(false)
    }

    // const handleCloseModal = () =>{
    //   setOpen(false)
    // }

    const addPermission = () =>{
      navigate('/perm/create')
    }

    // const handleEditPermission = (permission) => {
    //   navigate('/role/edit',{ state: permission })
    
    // }

const handleEditPermission = (permission) => {

  navigate('/perm/edit',{state:permission})
}

const handleAdd = () => navigate('/perm/addperm')


    const handledeletePermission = (user) =>{
      dispatch(deletePermissionThunk(user))

    }

    //MTable element -- view={handleOpenModal}  userColumn="true" // add={addPermission}

    return (
      <div className={`roles ${classes.listroles}`} >   
           <MTable columns={columns} datas={permisssions} label="PERMISSIONS" searchLabel="Search Permission" add={addPermission}  edit={handleEditPermission} addData={handleAdd}  deleteAction={handledeletePermission} view={handleOpenModal} />
           {/* <UserCard open={open} handleClose={handleCloseModal} user={roleDetail} /> */}
           <PermissionCard open={open} handleClose={handleCloseModal} permission={permissionDetails} />
        </div>
    )
}

export default ListRoles
