import React, { useEffect } from 'react'
import './SideNavbar.css'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import BallotIcon from '@mui/icons-material/Ballot';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SecurityIcon from '@mui/icons-material/Security';
import MenuIcon from '@mui/icons-material/Menu';
import TopNavbar from './TopNavbar'
import {toggleMenu} from '../redux/actions/action'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

function SideNavbar() {

    useEffect(() => {
        // let arrow = document.querySelectorAll(".arrow");
        // console.log(arrow);
        // for (var i = 0; i < arrow.length; i++) {
        //     arrow[i].addEventListener("click", (e)=>{
        //     let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
        //     arrowParent.classList.toggle("showMenu");
        //     });
        // }
        let sidebar = document.querySelector(".sidebar");
        let sidebarBtn = document.querySelector(".menu");
        sidebarBtn.addEventListener("click", ()=>{
        sidebar.classList.toggle("close");
        });

    }, [])

    const dispatch = useDispatch();




    return (
        <>
        <div className='sidebar close'>
            <div className="logo-details">
                <span className="logo_name">RBAC</span>
            </div>
            <ul className='nav-links'>
                <li>
                    <Link to="/users">
                    <GroupAddIcon className="ri-icons" />
                    <span className="link_name">Users</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><a className="link_name" href="#">User</a></li>
                    </ul>
                </li>
                <li>
                    <Link to="/asset">
                        <BallotIcon className="ri-icons"  />
                        <span className="link_name">Asset</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><a className="link_name" href="#">Asset</a></li>
                    </ul>
                </li>
                {/* <li>
                    <div className="iocn-link">
                        <Link to="/roles">
                            <FaUserTag className="ri-icons"/>
                            <span className="link_name">Role</span>
                        </Link>
                        <IoMdArrowDropdown className='arrow' />
                    </div>
                    <ul className="sub-menu">
                        <li><a className="link_name" href="">Role</a></li>
                        <li><Link to='/dashboard'><a href="">Create Role</a></Link></li>
                        <li><Link to='/dashboard'><a href="">List Roles</a></Link></li>
                    </ul>
                </li> */}
                <li>
                    <Link to="/roles">
                        <AssignmentIndIcon className="ri-icons"  />
                        <span className="link_name">Roles</span>
                    </Link>
                        
                    <ul className="sub-menu blank">
                        <li><Link className="link_name" to='/roles'>Role</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/permission">
                        <SecurityIcon className="ri-icons"/>
                        <span className="link_name">Permission</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link className="link_name" to="#">Permission</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div className="home-content">
            <TopNavbar menu={<MenuIcon className='menu' onClick={()=> dispatch(toggleMenu())} />} />
        </div>
        </>
    )
}

export default SideNavbar;