import { showSuccessSnackbar } from "./snackbarActions"

const incrementNextId = (nextId) => {
    return{
        type:'INCREMENT_NEXTID',
        payload:nextId
    }
}


export const addRoleThunk = (role) => {
    const addRole = (role) =>{
        return{
            type:'ADD_ROLE',
            payload:role
        }
    }  

    return dispatch =>{
        dispatch(addRole(role))
        dispatch(incrementNextId(role.id))
        dispatch(showSuccessSnackbar(`${role.name} role created successfully!`))
    }
}

export const deleteRoleThunk = (role) => {
    const deleteRole = (role) =>{
        return{
            type:'DELETE_ROLE',
            payload:role.id
        }
    }
    return dispatch =>{
        dispatch(deleteRole(role))
        dispatch(showSuccessSnackbar(`${role.name} was deleted!`,'error'))
    }
}

export const editRoleThunk = (role) => {
    const editRole = (role) =>{
        return{
            type:'EDIT_ROLE',
            payload:role
        }
    }

    return dispatch => {
        dispatch(editRole(role))
        dispatch(showSuccessSnackbar(`${role.name} Role edited successfully!`))
    }
}
