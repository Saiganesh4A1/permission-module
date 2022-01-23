import { showSuccessSnackbar } from "./snackbarActions"

const incrementNextId = (nextId) => {
    return{
        type:'INCREMENT_NEXTID',
        payload:nextId
    }
}


export const addPermissionThunk = (permission) => {
    const addPermission = (permission) =>{
        return{
            type:'ADD_PERMISSION',
            payload:permission
        }
    }  

    return dispatch =>{
        dispatch(addPermission(permission))
        dispatch(incrementNextId(permission.id))
        // dispatch(showSuccessSnackbar(`${permission} was created successfully!`))
        dispatch(showSuccessSnackbar(`Added successfully!`))
    }
}

export const deletePermissionThunk = (permission) => {
    const deletePermission = (permission) =>{
        return{
            type:'DELETE_PERMISSION',
            payload:permission.id
        }
    }
    return dispatch =>{
        dispatch(deletePermission(permission))
        // dispatch(showSuccessSnackbar(`${role.permission} was deleted!`,'error'))
        dispatch(showSuccessSnackbar(`Deleted successfully..`))
    }
}

export const editPermissionThunk = (permission) => {
    const editPermission = (permission) =>{
        return{
            type:'EDIT_PERMISSION',
            payload:permission
        }
    }

    return dispatch => {
        dispatch(editPermission(permission))
        // dispatch(showSuccessSnackbar(`${role.permission} Role edited successfully!`))
        dispatch(showSuccessSnackbar(`  edited successfully!`))
    }
}
