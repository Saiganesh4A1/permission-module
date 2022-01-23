import React from 'react'
import Button from '@mui/material/Button';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
function AddButton({onClick}) {
    return (

        <Button variant="contained" onClick={onClick} endIcon={<AddCircleRoundedIcon  />}>
            Add
        </Button>
    )
}

export default AddButton
