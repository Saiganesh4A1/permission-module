import { showSuccessSnackbar } from '../actions/snackbarActions';
// import {incrementNextId} from './userActions'
export const incrementNextId = (nextId) => {
    return{
        type:'INCREMENT_NEXTID',
        payload:nextId
    }
}
const addUser = (user) => {
    return{
        type:'ADD_USER',
        payload:user
    }
}
export const addUserThunk = (user) => {
    return dispatch => {
        dispatch(addUser(user))
        dispatch(incrementNextId(user.id))
        dispatch(showSuccessSnackbar("User added successfully!"))
    }
}  
export const editUser = (user) => {
    return{
        type:'EDIT_USER',
        payload:user
    }
}
export const editUserThunk = (user) => {
    return dispatch => {
        dispatch(editUser(user))
        dispatch(showSuccessSnackbar("User edited successfully!"))
    }
}  
// one way of implementing thunk
// export const deleteUser = (id) => {
//     return{
//         type:'DELETE_USER',
//         payload:id
//     }
// }
// export const deleteUserThunk = (user) => {
//     return dispatch => {
//         dispatch(deleteUser(user.id))
//         dispatch(showSuccessSnackbar(`${user.name} was deleted!`,"error"))
//     }
// }  
 //another way of implementing thunk
export const deleteUserThunk = (user) => {
    const deleteUser = (id) => {
        return{
            type:'DELETE_USER',
            payload:id
        }
    }
    return dispatch => {
        dispatch(deleteUser(user.id))
        dispatch(showSuccessSnackbar(`${user.name} was deleted!`,"error"))
    }
}  