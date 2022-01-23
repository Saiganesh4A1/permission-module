import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MTable from '../../components/MTable'
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { deleteAssetThunk } from '../../redux/actions/assetAction';

import UserCard from '../../components/UserCard'



const useStyles = makeStyles((theme) => ({
    checkbox: {
        marginRight: '15px',
    },
    checkboxLabel: {
        fontSize: '18px',
    },
    checkboxItem: {
        display: 'flex',
        alignItems: 'center',

    },
    dialogContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    checkboxIcon: {
        marginRight: '3px',
        fontSize: '18px',
        color: 'black'
    },

    assets: {
        height: '100%',
        position: 'relative',
        left: '68px',
        width: '100%',
        padding: '30px',
        boxSizing: 'border-box'
    },


}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

let assetDetail = {}


function ViewAsset() {


    const toogleState = useSelector(state => state.toogle.toogleState)
    const classes = useStyles();
    let navigate = useNavigate();
    // const [open1, setOpen1] = useState(false);
    // const [open2, setOpen2] = useState(false);
    const [open, setOpen] = useState(false);



    const assets = useSelector(state => state.asset.assets)

    const dispatch = useDispatch()

    const handleDeleteAsset = (asset) => {
        dispatch(deleteAssetThunk(asset))
    }
    const handleEditAsset = (asset) => {
        navigate('/asset/edit', { state: asset })

    }

    //     const handleClickOpen1 = () => {
    //         setOpen1(true);
    //     };

    //   const handleClickOpen2 = () => {
    //     setOpen2(true);
    //   };

    //   const handleCloseDialog = () => {
    //     setOpen1(false);
    //   };
    //   const handleClose2 = () => {
    //     setOpen2(false);
    //   };

    const addAssest = () => {
        navigate('/asset/create')
    }


    useEffect(() => {
        let cls = document.getElementsByClassName('view-asset')[0];
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

    const handleOpenModal = (asset) => {
        assetDetail = asset;
        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false)
    }



    return (
        <div className={`view-asset ${classes.assets}`}>



            <MTable columns={[{ id: 'name', label: 'Entity Name' }, { id: 'encode', label: 'Entity Code' }, { id: 'entype', label: 'Entity Type' }, { id: 'enprevi', label: 'Previleges' }]} label="ASSETS" searchLabel="Search Assets" datas={assets} edit={handleEditAsset} add={addAssest} deleteAction={handleDeleteAsset} view={handleOpenModal}  />
            <UserCard open={open} handleClose={handleCloseModal} user={assetDetail} />



        </div>
    )
}

export default ViewAsset