const initialState ={
    roles:[{id:1,name:"Yogesh Kumar",userCode:"yogi"},{id:2,name:"Praveen",userCode:"asd"},{id:3,name:"Navin Kumar",userCode:"navi"}]
}

const usersroleReducer = (state=initialState,action) =>{
    switch(action.type){
        case 'ADD_USERROLE':
            return{
                ...state,
                roles:[...state.roles,action.payload]
            }
        
        case 'DELETE_USERROLE':
            return{
                ...state,
                roles:state.roles.filter(role => {
                    return action.payload!==role.id
                })
            }
        default: return state
    }
}

export default usersroleReducer;