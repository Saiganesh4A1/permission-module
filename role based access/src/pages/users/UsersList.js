import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  makeStyles, Box, Typography,Modal, Avatar} from '@material-ui/core'
// import {Button,Stack} from '@mui/material';
// import {Link} from 'react-router-dom'
// import { headCells, usersData } from './UsersData';
import { useNavigate } from 'react-router-dom';
import MTable from '../../components/MTable';
import {deleteUserThunk} from '../../redux/actions/userActions'
import UserCard from '../../components/UserCard';

const useStyles = makeStyles((theme) => ({
    usersList:{
      height:'calc(100vh-60px)',
      position: 'relative',
      left:'68px',
      width: 'calc(100% - 68px)',
      boxSizing:'border-box',
      padding: '30px'
    }
}));
//modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

// if we want random colors for avatars
function randomColor() {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    let color = "#" + hex.toString(16);
    return color;
  }
let userDetails = {}
const UsersList = () => {
    const users = useSelector(state => state.users.users)
    const toogleState = useSelector(state => state.toogle.toogleState) 
    const dispatch = useDispatch()
    let navigate = useNavigate()
    
    const classes = useStyles();
    //modal
    const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    const handleOpen = (user) => {
        setOpen(true)
        userDetails = user
    }
    const handleClose = () => setOpen(false);

    const headCells = [
        {id: 'name', label: 'Name'},
        {id: 'userCode', label: 'User Code'}
    ]
    const deleteUserHandler = (user) => {
        dispatch(deleteUserThunk(user))
    }
    const editUserHandler = (user) => {
            navigate('/user/edit',{ state: user })
          
    }
    useEffect(() => {
        let cls = document.getElementsByClassName('view-usersList')[0];
        if (toogleState) {
            cls.style.left = "260px";
            cls.style.transition = "all 0.5s ease";
            cls.style.width = "calc(100% - 260px)";
        }
        if (!toogleState) {
            cls.style.left = "68px"
            cls.style.width = "calc(100% - 68px)";
        }
    }, [toogleState])
    const addUser = () =>{
        navigate('/user/create')
      }
      
    return (
        <div className={`view-usersList ${classes.usersList}`}>
            {/* handleOpen is for modal */}
            <MTable columns={headCells} datas={users} label="USERS" searchLabel="Search User" add={addUser}  edit={editUserHandler} deleteAction={deleteUserHandler} view={handleOpen}/>
            <UserCard open={open} handleClose={handleClose} user={userDetails} />
            {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    User Details:
                    </Typography>
                   <Typography>User Id - {userDetails.userId}</Typography>
                   <Typography>User Name - {userDetails.name}</Typography>
                   <Typography>User Code - {userDetails.userCode}</Typography>
                </Box>
            </Modal> */}
        </div>
    )
}

export default UsersList