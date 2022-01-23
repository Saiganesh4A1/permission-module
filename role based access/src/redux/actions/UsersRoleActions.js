import { showSuccessSnackbar } from "./snackbarActions"

const incrementNextId = (nextId) => {
    return{
        type:'INCREMENT_NEXTID',
        payload:nextId
    }
}


export const addUserRoleThunk = (user) => {
    const addUserRole = (user) =>{
        return{
            type:'ADD_USERROLE',
            payload:user
        }
    }    

    return dispatch =>{
        dispatch(addUserRole(user))
        dispatch(showSuccessSnackbar(`${user.name} added successfully!`))
    }
}

export const deleteUserRoleThunk = (user) =>{
    const deleteUserRole = (user) =>{
        return{
            type:'DELETE_USERROLE',
            payload:user.id
        }
    }
    return dispatch =>{
        dispatch(deleteUserRole(user))
        dispatch(showSuccessSnackbar(`${user.name} was deleted!`,'error'))
    }
}