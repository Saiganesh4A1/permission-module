import { showSuccessSnackbar } from "./snackbarActions"

const incrementNextId = (nextId) => {
    return{
        type:'INCREMENT_NEXTID',
        payload:nextId
    }
}


export const addPermissionThunk = (role) => {
    const addPermission = (role) =>{
        return{
            type:'ADD_PERMISSION',
            payload:role
        }
    }  

    return dispatch =>{
        dispatch(addPermission(role))
        dispatch(incrementNextId(role.id))
        dispatch(showSuccessSnackbar(`${role.permission} was created successfully!`))
    }
}

export const deletePermissionThunk = (role) => {
    const deletePermission = (role) =>{
        return{
            type:'DELETE_PERMISSION',
            payload:role.id
        }
    }
    return dispatch =>{
        dispatch(deletePermission(role))
        dispatch(showSuccessSnackbar(`${role.permission} was deleted!`,'error'))
    }
}

export const editPermissionThunk = (role) => {
    const editPermission = (role) =>{
        return{
            type:'EDIT_PERMISSION',
            payload:role
        }
    }

    return dispatch => {
        dispatch(editPermission(role))
        dispatch(showSuccessSnackbar(`${role.permission} Role edited successfully!`))
    }
}
