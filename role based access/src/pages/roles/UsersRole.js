import React, { useEffect, useState } from 'react'
import MTable from '../../components/MTable'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import { addUserRoleThunk, deleteUserRoleThunk } from '../../redux/actions/UsersRoleActions';
import UserCard from '../../components/UserCard';

const useStyles = makeStyles((theme)=>({
    usersrole:{
        boxSizing: 'border-box',
        height:'calc(100vh-60px)',
        position:'relative',
        left:'68px',
        width: 'calc(100% - 68px)',
        padding: '30px'
    },
    fileName:{
        marginLeft: '10px',
        fontFamily: 'sans-serif',
        color: '#aaa',
    },
    dialog:{
        padding:'0px'
    }

  }))

function DropdownRoles({selectedRole}){

    const roles = useSelector(state => state.role.roles)
    const roleNames=[]
    roles.map((role)=>{
        roleNames.push(role.name);
    })
    const [dropRoles, setDropRoles] = useState(selectedRole)

    const handleChange = (e) => {
        setDropRoles(e.target.value)
    }

    return(
        <FormControl sx={{ml:3, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-label">Roles</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dropRoles}
            label="Roles"
            onChange={handleChange}
            >
            {
                roleNames.map((role,index)=>(
                    <MenuItem key={index} value={role}>{role}</MenuItem>
                ))
            }
            </Select>
      </FormControl>
    )
}  

function BulkUpload(){
    const classes = useStyles();
    const handleClick = (e) =>{
        const realButton = document.getElementById("real-file");
        realButton.click();
    }

    const handleChange = () =>{
        const realButton = document.getElementById("real-file");  
        const fileName = document.getElementsByClassName('filename')[0]      
        if (realButton.value) {
            fileName.innerHTML = realButton.value.match(
              /[\/\\]([\w\d\s\.\-\(\)]+)$/
            )[1];
          } else {
            fileName.innerHTML = "No file chosen";
          }
    }

    return(
        <div style={{display:'inline',marginRight:'20px'}}>
            <input type="file" id="real-file" hidden="hidden" onChange={handleChange} />
            <Button variant="contained" onClick={handleClick} startIcon={<CloudUploadIcon  />}>
                BULK UPLOAD
            </Button>
            <span className={`filename ${classes.fileName}`}>No file chosen</span>
        </div>
    )
}

function SearchedUserAvatar({user}){
    return(
        <div style={{display:'flex',alignItems:'center',marginTop:'20px',fontSize:'20px'}}>
            <Avatar
                sx={{ bgcolor: '#8AC7DB',marginRight:'20px' }}
                alt="Remy Sharp"
            />
            <h4>{user['name']}</h4>
        </div>
    )
}
let user={};
function UsersRole() {
    const usersrole = useSelector(state => state.usersrole.roles)
    const toogleState = useSelector(state => state.toogle.toogleState)
    const classes = useStyles();
    let navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    

    const selectedRole=location.state.selectedRole;

    const columns=[{id:'name',label:'Name'},{id:'userCode',label:'User Code'}]

    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState('')
    const [searched, setSearched] = useState(null)

    useEffect(() => {
        let cls=document.getElementsByClassName('usersrole')[0];
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

    useEffect(() => {
        
    }, [])

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    
    console.log(user)

    const viewUser = (data) =>{
        console.log(data)
        handleOpenModal();
        user=data;
        console.log(user,">>>>>>>>>>>>")
        
    }
    console.log(user)

    const addUserToRole = () =>{
        console.log(searched)
        setSearchText('')
        dispatch(addUserRoleThunk(searched))
        setSearched(null)
        handleClose()
      }

    const handleEditUserRole = (role) => {
        // console.log('edit role action',role)
        // navigate('/role/edit',{ state: role })
    
    }
    const handledeleteUserRole = (user) =>{
        dispatch(deleteUserRoleThunk(user))

    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        console.log('close')
        setSearched(null)
        setSearchText('')
        setOpen(false);
    };
    const handleSearch = (searchValue) => {

        usersrole.map(user=>{
            if(user.userCode===searchValue){
                setSearched(user);
            }
        })
        console.log(searched)

    };


    return (
        <div className={`usersrole ${classes.usersrole} `}>
            
            <MTable columns={columns} datas={usersrole} label="USERS AND ROLES" searchLabel="Search Users" dropDown={<DropdownRoles selectedRole={selectedRole} />} uploadButton={<BulkUpload />} edit={handleEditUserRole} add={handleClickOpen} deleteAction={handledeleteUserRole} view={viewUser} />

            <Dialog onClose={handleClose} open={open} >
                <DialogTitle>Add User</DialogTitle>
                <hr />
                <DialogContent >
                <TextField
                    id="input-with-icon-textfield"
                    label="TextField"
                    value={searchText}
                    onChange={(e)=>setSearchText(e.target.value)}
                    placeholder='Search User'
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <AccountBoxIcon />
                        </InputAdornment>
                        

                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton aria-label="delete" onClick={()=>handleSearch(searchText)}>
                            <SearchIcon />
                        </IconButton>
                        </InputAdornment>
                    )
                    }}
                    variant="standard"
                />
                {searched && <SearchedUserAvatar user={searched} /> }
                </DialogContent>
                <DialogActions>
                    <Button onClick={addUserToRole} autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            {/* View the user Modal */}
            <UserCard open={openModal} handleClose={handleCloseModal} user={user} role={selectedRole} />
        </div>
    )
}

export default UsersRole
