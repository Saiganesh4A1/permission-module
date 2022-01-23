import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteRoleThunk } from '../../redux/actions/roleActions'
import MTable from '../../components/MTable'
import { makeStyles } from '@material-ui/core/styles';
import UserCard from '../../components/UserCard'


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

let roleDetail ={}

function ListRoles() {

  // const [roles, setRoles] = useState([{}])
  const roles = useSelector(state => state.role.roles)
  const dispatch = useDispatch()
  const toogleState = useSelector(state => state.toogle.toogleState)
  const classes = useStyles();
  let navigate = useNavigate()

  const [open, setOpen] = useState(false);


  
  const columns=[{id:'name',label:'Role Name'},{id:'rolecode',label:'Role Code'}]

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

    const handleOpenModal = (role) =>{
      // roleDetail=role; --when we are commenting this we don't get userName value and usercode.
      roleDetail = role;
      setOpen(true);
    }

    const handleCloseModal = () =>{
      setOpen(false)
    }

    const addRole = () =>{
      navigate('/roles/create')
    }

    const handleEditRole = (role) => {
      navigate('/role/edit',{ state: role })
    
    }
    const handledeleteRole = (user) =>{
      dispatch(deleteRoleThunk(user))
    }

    //   MTable element -- userColumn="true" ---when i comment users icons and data will disappear

    return (
      <div className={`roles ${classes.listroles}`} >
           <MTable columns={columns} datas={roles} label="ROLES" searchLabel="Search Roles" edit={handleEditRole} add={addRole} deleteAction={handledeleteRole} view={handleOpenModal} userColumn="true"   />
           <UserCard open={open} handleClose={handleCloseModal} user={roleDetail}  />
        </div>
    )
}

export default ListRoles
