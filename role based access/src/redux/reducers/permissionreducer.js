
// permissiondata:[{id:'1',permission:'CREATE',involvement:'VIEW'}] ,involvement:'VIEW'

const initialState ={
    permissiondata:[{id:'1',permission:'CREATE'}],
    nextId:2,
}

const PermissionReducer = (state=initialState,action) =>{
    switch(action.type){
        case 'INCREMENT_NEXTID':
            return {
                ...state,
                nextId: action.payload + 1
            }
            
        case 'ADD_PERMISSION':
            return{
                ...state,
                permissiondata:[...state.permissiondata,action.payload]
            }
        
        case 'DELETE_PERMISSION':
            return{
                ...state,
                permissiondata:state.permissiondata.filter(permission => {
                    return action.payload!==permission.id
                })
            }
        case 'EDIT_PERMISSION':
            state.permissiondata.map(permission => {
                if(action.payload.id === permission.id){
                    // role.rolecode=action.payload.rolecode
                    // role.name = action.payload.name
                    permission.permission=action.payload.permission
                    // permission.involvement=action.payload.involvement
                }
                return state
            })
            return{
                ...state,
                permissiondata:[...state.permissiondata]
                
            }
        default: return state
    }
}

export default PermissionReducer;


/* --
case 'EDIT_PERMISSION':
            state.permissiondata.map(role => {
                if(action.payload.id === role.id){
                    role.rolecode=action.payload.rolecode
                    role.name = action.payload.name
                }
                return state
            })
        
- */
