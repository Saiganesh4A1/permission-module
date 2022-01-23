const initialState = {
    toogleState :false
}

const toogleReducer = (state = initialState , action) =>{
    switch(action.type){
        case 'TOOGLE':
            return{
                ...state,
                toogleState:!state.toogleState
            }
    
        default: return state
    }
}

export default toogleReducer