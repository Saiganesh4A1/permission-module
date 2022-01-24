import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const style = {
    modal:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        padding:'0px',
        outline:'none'
    },
    upper:{
        height: '120px',
        background: '#7F00FF'
    },
    imageCont:{
        background:'#fff',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        transform: 'translate(100px,70px)'
    },
    lower:{
        height: 'auto',
        backgroundColor: '#FFF',
        padding: '20px',
        paddingTop: '40px',
        textAlign: 'center'
    },
    title:{
        marginTop:'30px',
        'h3':{
            boxSizing: 'border-box',
            lineHeight: '.6',
            fontWeight: 'bolder',
            marginBottom:'10px'
        },  
        'h4':{
            color: '#444444',
            opacity: '.6',
            fontWeight: 'bold'
        }

    },
    content:{
        textAlign:'left',
        padding:'20px',
        'h3':{
            fontWeight:'lighter',
            fontSize:'18px',
            lineHeight:'1.6'
        }
    }
 
};

function PermissionCard({open,handleClose,permission,permissionDetails}) {

    
    return (
        <div key={permission.id}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.modal}>
                    <Box sx={style.upper}>
                        <Box sx={style.imageCont}>
                            {/* <img src={profile} alt="profile" style={{width:'100px',height:'100px',borderRadius:'50%'}} /> */}
                            <AccountCircleIcon style={{width:'100px',height:'100px',borderRadius:'50%'}} />
                        </Box>
                    </Box>
                    <Box sx={style.lower}>
                        <Box sx={style.title}>
                            <h3>{permission.permission}</h3>
                            {permissionDetails && <h4>{permissionDetails}</h4>}
                        </Box>
                        <Box sx={style.content}>
                            <h3><strong>Permission</strong> {" "} :{" "}{permission.permission}</h3>
                            {/* <h3><strong>Involvement</strong>{" "}:{" "}{permission.involvement}</h3> */}
                            {/* {permissionDetails && <h3><strong>Role</strong>{" "}:{" "}{permissionDetails}</h3>} */}
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default PermissionCard
