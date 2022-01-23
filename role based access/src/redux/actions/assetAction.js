import { showSuccessSnackbar } from "./snackbarActions"

const incrementNextId = (nextId) => {
    return{
        type:'INCREMENT_NEXTID',
        payload:nextId
    }
}

//one way of implementing thunk
export const deleteAssetThunk = (asset) => {
    const deleteAsset = (id) => {
        return{
            type:'Delete_Asset',
            payload:id
        }
    }
    return dispatch => {
        dispatch(deleteAsset(asset.id))
        dispatch(showSuccessSnackbar(`${asset.name} was deleted!`,"error"))
    }
}
//another way of implementing thunk
const addAsset = (asset) => {
    return{
        type:'Add_Asset',
        payload:asset
    }
}
export const addAssetThunk = (asset) => {
    return dispatch =>{
        dispatch(addAsset(asset))
        dispatch(incrementNextId(asset.id))
        dispatch(showSuccessSnackbar("Asset added successfully!"))
    }
}
const editAsset = (asset) => {
    return{
        type:'Edit_Asset',
        payload:asset
    }
}
export const editAssetThunk = (asset) => {
    return dispatch => {
        dispatch(editAsset(asset))
        dispatch(showSuccessSnackbar("Asset edited successfully!"))
    }
}