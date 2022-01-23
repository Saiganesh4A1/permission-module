const initialState ={
    roles:[{id:'1',name:'Admin',rolecode:'adm01'},{id:'2',name:'TenantAdmin',rolecode:'tadm01'},{id:'3',name:'Payroll Processor',rolecode:'pp02'},{id:'4',name:'Employee',rolecode:'emp01'},{id:'5',name:'HR',rolecode:'hr01'}],
    nextId:6,
}

const roleReducer = (state=initialState,action) =>{
    switch(action.type){
        case 'INCREMENT_NEXTID':
            return {
                ...state,
                nextId: action.payload + 1
            }
            
        case 'ADD_ROLE':
            return{
                ...state,
                roles:[...state.roles,action.payload]
            }
        
        case 'DELETE_ROLE':
            return{
                ...state,
                roles:state.roles.filter(role => {
                    return action.payload!==role.id
                })
            }
        case 'EDIT_ROLE':
            state.roles.map(role => {
                if(action.payload.id === role.id){
                    role.rolecode=action.payload.rolecode
                    role.name = action.payload.name
                }
                return state
            })
            return{
                ...state,
                roles:[...state.roles]
                
            }
        default: return state
    }
}

export default roleReducer;
