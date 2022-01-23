import React from 'react'
import './TopNavbar.css'
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function TopNavbar(props) {

    return (
        <div className='topnavbar'>
            <div className='topnavbar-left'>
                    {props.menu}
            </div>
            <div className='topnavbar-right'>
                <div className='profile-details'>
                    <p className='empname'>Praveen</p>
                    <p className='emptype'>Employee </p><PersonIcon  />
                </div>
                <div className='profile'>
                    <AccountCircleIcon />
                    <p>Logout</p> 
                </div>
            </div>
        </div>
    )
}

export default TopNavbar
